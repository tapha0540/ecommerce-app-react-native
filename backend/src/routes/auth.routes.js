import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AuthMiddlewares from "../middlewares/auth.middlewares.js";
import getSessionMiddleware from "../middlewares/getSession.middleware.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  AuthMiddlewares.signUp,
  asyncHandler(AuthController.signUp),
);

authRouter.post(
  "/login",
  AuthMiddlewares.login,
  asyncHandler(AuthController.logIn),
);

authRouter.get(
  "/session",
  getSessionMiddleware,
  asyncHandler(AuthController.getUserSession),
);

export default authRouter;
