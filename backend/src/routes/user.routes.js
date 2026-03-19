import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import asyncHandler  from "../middlewares/asyncHandler.middleware.js";

const userRouter = Router();



export default userRouter;
