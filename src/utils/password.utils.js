import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()
export async function hashPassword(password){
    try {
        return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function matchPassword(password, hashedPassword){
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        throw error;
    }
}