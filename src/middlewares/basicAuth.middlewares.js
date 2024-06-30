import base64 from 'base-64';
import dotenv from'dotenv';

dotenv.config();




const decodeCredentials = async(authHeader) => {
    const encodedCredentials = authHeader.trim().replace(/Basic\s+/i,'');
    console.log({encodedCredentials});
    const decodedCredentials = base64.decode(encodedCredentials);
    console.log({decodedCredentials});
    return decodedCredentials.split(':');
}

export const authMiddleware = async(req, res, next) => {
    const [username, password] = await decodeCredentials(req.headers.authorization || '');
    console.log({username});
    console.log({password});

    console.log({"fromEnvUser": process.env.USER})
    console.log({"passFromEnv": process.env.PASSWORD});
    if(username == process.env.USER && password == process.env.PASSWORD){
        console.log("here==============")
        return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Basic authentication required.');
}