import { hashPassword, matchPassword} from "../utils/password.utils.js";
import { v4 as uuidV4 } from "uuid";
import { 
    userSignUpServices, saveNewUser, newUserVerify, findUserByToken, updateVerificationToken, addTokenToDataBase,
    updateUserPassword
} from "../services/onboarding.services.js";
import {sendMail} from "../lib/nodemailer/mailManager.js";
export const userSignUp = async(req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, password} = req.body;
        const ifEmailExist = await userSignUpServices(email);
        if(ifEmailExist){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "EMAIL_ALREADY_EXIST", 
                    "message": "Looks like this email is already registered with us. Try using a different email or sign in to your old account."
                }
            );
        }
        const hashedPassword = await hashPassword(password);
        const verificationToken = uuidV4();
        const result = await saveNewUser({firstName, lastName, email, mobileNumber, password:hashedPassword, verificationToken});
        if(!result){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "FAILED_TO_SAVE_USERDATA", 
                    "message": "There might be some error in saving the data. Please try again in after some time."
                }
            );
        }
        const subject = "SIGN-UP VERIFICATION";
        const link = `http://localhost:8080/verify-signup-token/${verificationToken}`;
        const content = `Kudos! ${firstName} ${lastName}, You have successfully registered with us. Please click the below link to verify your email. VERIFICATION_LINK -> ${link}`;
        await sendMail( email, subject, content )

        return res.status(201).json(
            {
                "result": "SUCCESS", 
                "type": "USER_SIGNUP_SUCCESSFULLY", 
                "data": result, 
                "message": "User sign up successfully"
            })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const verifySignupToken = async(req, res) => {
    try {
        const token = req.params.token;
        const user = await findUserByToken(token);
        if(!user){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "VERIFICATION_FAILED", 
                    "message": "Your verification token is expired. Try to regenerate your Token."
                }
            );
        }
        if(user?.isVerified){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "ALREADY_VERIFIED", 
                    "message": "Your email is already verified. Please try to sign in to your account."
                }
            );
        }

        await newUserVerify(user?.email);
        return res.status(200).json(
            {
                "result": "SUCCESS",
                "type": "VERIFIED_SUCCESSFULLY",
                "message": "Your email has been verified successfully."
            })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const resendVerificationTokenController = async(req, res) => {
    try {
        const {email} = req.body;
        const ifEmailExist = await userSignUpServices(email);
        if(!ifEmailExist){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "USER_NOT_EXIST", 
                    "message": "The given email is not registered with us. Please try to sign up again or try with another email"
                }
            );
        }
        const verificationToken = uuidV4();
        await updateVerificationToken(email ,verificationToken);
        const subject = "SIGN-UP VERIFICATION";
        const link = `http://localhost:8080/verify-signup-token/${verificationToken}`;
        const content = `Kudos! ${ifEmailExist?.firstName} ${ifEmailExist?.lastName}, You have successfully registered with us. Please click the below link to verify your email. VERIFICATION_LINK -> ${link}`;
        await sendMail( email, subject, content )
        return res.status(200).json(
            {
                "result": "SUCCESS",
                "type": "RESEND_VERIFICATION_TOKEN",
                "message": "Verification token has been resended to your mail successfully."
            }
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const forgetPasswordController = async(req, res) => {
    try {
        const {email} = req.body;
        const ifEmailExist = await userSignUpServices(email);
        if(!ifEmailExist){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "USER_NOT_EXIST", 
                    "message": "The given email is not registered with us. Please try to sign up again or try with another email"
                }
            );
        }
        const forgetPasswordToken = uuidV4();
        await addTokenToDataBase(forgetPasswordToken, email);
        const subject = "FORGET PASSWORD REQUEST";
        const link = `http://localhost:8080/reset-password`;
        const content = `Dear ${ifEmailExist?.firstName} ${ifEmailExist?.lastName},\n we have received you request for changing the password associated with your email address ${ifEmailExist?.email}. If you would like to change the password, Please follow the given link. \n${link}.\n\n If you did not make the request or no longer wanted to change the password then please ignore this email.`;
        await sendMail( email, subject, content );
        return res.status(200).json(
            {
                "result": "SUCCESS",
                "type": "FORGET_PASSWORD_REQUEST",
                "message": `Reset password link has been sent to your email.`,
                "token":`${forgetPasswordToken}`
            }
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export  const resetPasswordController = async(req, res) => {
    try {
        const {email, token, newPassword, confirmPassword} = req.body;
        const ifEmailExist = await userSignUpServices(email);
        if(!ifEmailExist){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "USER_NOT_EXIST", 
                    "message": "The given email is not registered with us. Please try to sign up again or try with another email"
                }
            );
        }

        if(token != ifEmailExist?.forgetPasswordToken) {
            return res.status(400).json(
                {
                    "result": "ERROR",
                    "type": "BAD_TOKEN",
                    "message": "You are unauthorised"
                }
            )
        }
        if(newPassword != confirmPassword){
            return res.status(400).json(
                {
                    "result": "ERROR",
                    "type": "INVALID_PASSWORDS",
                    "message": "New password and confirm password are not same"
                }
            )
        }
        const hashedPassword = await hashPassword(newPassword);
        const result = await updateUserPassword(ifEmailExist?._id, hashedPassword);
        if(!result){
            return res.status(400).json(
                {
                    "result": "ERROR",
                    "type": "BAD_REQUEST",
                    "message": "Something went wrong! Please try agin later in some time"
                }
            )
        }
        return res.status(200).json({
            "result":"SUCCESS",
            "type": "PASSWORD_UPDATED",
            "message": "Password has been updated successfully"
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const loginControllers = async(req,res) => {
    try {
        const {email, password} = req.body;
        const ifEmailExist = await userSignUpServices(email);
        if(!ifEmailExist){
            return res.status(400).json(
                {
                    "result": "FAILED",
                    "type": "USER_NOT_EXIST", 
                    "message": "The given email is not registered with us. Please try to sign up again or try with another email"
                }
            );
        }
        const result = await matchPassword(password, ifEmailExist?.password)
        if(!result){
            return res.status(400).json(
                {
                    "result": "ERROR",
                    "type": "BAD_REQUEST",
                    "message": "Wrong password! please try again"
                }
            )
        }
        return res.status(200).json(
            {
                "result": "SUCCESS",
                "type": "USER_LOGIN",
                "message": "Logged in successfully"
            }
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}