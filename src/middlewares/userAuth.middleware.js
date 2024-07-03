import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { findUserByUserId } from "../services/onboarding.services.js";
dotenv.config();



export const decodeAccessJwtToken = (accessToken) => {

    try {
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log({decode});
        return decode;
    } catch (error) {
        console.error(error.message);

    }

}

export const createAccessToken = async(userId) => {
    const payload = {id: userId};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const option = {expiresIn:"180d" }
    const accessToken = jwt.sign(payload,secret,option);
    return accessToken;
}

export const verifyJwtToken = async(req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decode  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let userDetails = await findUserByUserId(decode.id);
        if(userDetails){
            req["userDetails"] = userDetails;
            next();
        }else{
            res.status(400).json({message: "you are logged out please login to access thi sservice"});
        }
    } catch (error) {
        console.error("error in verifying access token",error.message);
        res.status(500).json({message: 'jwt Expired'});
    }

}