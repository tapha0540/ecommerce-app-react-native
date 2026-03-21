import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  validateLogin,
  validateSignUp,
} from "../middlewares/validations.middlewares.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, asyncHandler(AuthController.signUp));
authRouter.post("/login", validateLogin, asyncHandler(AuthController.logIn));
authRouter.get(
  "/session",
  authMiddleware,
  asyncHandler(AuthController.getUserSession),
);

export default authRouter;
