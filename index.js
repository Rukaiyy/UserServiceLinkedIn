import express from "express";
import dotenv from "dotenv";
import {databaseConnection} from "./src/lib/databases/connection.js";
import router from "./src/routes/onboarding.routes.js";
import routerOne from "./src/routes/userProfile.routes.js";
dotenv.config()
const app = express()
app.use(express.json())
await databaseConnection()
app.use("/",router);
app.use("/user", routerOne);


app.listen(process.env.PORT,()=>{
    console.log('====================================');
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log('====================================');
})