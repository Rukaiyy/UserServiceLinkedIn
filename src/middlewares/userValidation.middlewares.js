import Joi from "joi";

export const newUserValidate = async (req, res, next) => {
    try {
        const signUpSchema = Joi.object({
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
            mobileNumber: Joi.string().trim().required(),
            password: Joi.string().trim().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required()
        });
        const result = signUpSchema.validate(req.body);
        if(result.error){
            console.log(result.error);
            throw error;
        }else{
            next();
        }
    } catch (error) {
        console.error("Error in registring the user",error);
        res.status(400).json({message: "Error in registering new user", error: error.message});
    }
}

export const resendVerificationToken = async(req, res, next) => {
    try {
        const resendSchema = Joi.object({
            email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
        })
        const result = resendSchema.validate(req.body);
        if(result.error){
            console.log(result.error);
            throw error;
        }else {
            next();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const resetPasswordValidations = async(req, res, next) => {
    try {
        const resetPasswordSchema = Joi.object({
            token: Joi.string().trim().required(),
            email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).required(),
            newPassword:  Joi.string().trim().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required(),
            confirmPassword:  Joi.string().trim().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required()
        })
        const result = resetPasswordSchema.validate(req.body);
        if(result.error){
            console.log(result.error);
            throw error;
        }else {
            next();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const loginValidations = async(req,res,next) => {
    try {
        const userLoginSchema = Joi.object({
            email: Joi.string().trim().required(),
            password:  Joi.string().trim().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).required(),
        })
        const result = userLoginSchema.validate(req.body);
        if(result.error){
            console.log(result.error);
            throw error;
        }else {
            next();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}