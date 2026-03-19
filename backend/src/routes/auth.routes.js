import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validations.middlewares.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, asyncHandler(AuthController.signUp));
authRouter.post("/login", validateLogin, asyncHandler(AuthController.logIn));
authRouter.post("/session", asyncHandler(AuthController.getSession));

export default authRouter;
