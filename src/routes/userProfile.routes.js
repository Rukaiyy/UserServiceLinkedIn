import express from "express"
import { authMiddleware } from "../middlewares/basicAuth.middlewares.js";
import { getprofileController } from "../controllers/profile.controller.js"

const routerOne = express();

routerOne.get("/profile", authMiddleware, getprofileController);

export default routerOne;