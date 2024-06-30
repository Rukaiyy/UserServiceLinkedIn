import { UserModel } from "../models/index.js";
export async function userSignUpServices(email) {
    try {
        return await UserModel.findOne({"email": email});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function saveNewUser(params){
    try {
        const newUser = new UserModel(params);
        return await newUser.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function findUserByToken(token){
    try {
        return await UserModel.findOne({verificationToken: token});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function newUserVerify(email){
    try {
        return await UserModel.findOneAndUpdate({email: email},{isVerified: true})
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateVerificationToken(email, token){
    try {
        return await UserModel.findOneAndUpdate({email: email}, {verificationToken: token});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addTokenToDataBase(forgetToken, email) {
    try {
        return await UserModel.findOneAndUpdate({email:email}, {forgetPasswordToken: forgetToken});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateUserPassword(userId, password) {
    try {
        return await UserModel.findByIdAndUpdate({"_id": userId}, {"password": password}, {new: true});
    } catch (error) {
        console.error(error);
        throw error;
    }
}