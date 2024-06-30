import express from "express"
import dotenv from "dotenv"
import {databaseConnection} from "./src/lib/databases/connection.js"
import router from "./src/routes/onboarding.routes.js";
dotenv.config()
const app = express()
app.use(express.json())
await databaseConnection()
app.use("/",router);


app.listen(process.env.PORT,()=>{
    console.log('====================================');
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log('====================================');
})