import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import getSessionMiddleware from "../middlewares/getSession.middleware.js";
import OrderMiddlewares from "../middlewares/order.middlewares.js";

const orderRouter = Router();

orderRouter.use(getSessionMiddleware);

orderRouter.get("/", asyncHandler(OrderController.getOrdersByUserId));
orderRouter.post(
  "/",
  OrderMiddlewares.ordersProducts,
  asyncHandler(OrderController.orderProducts),
);

export default orderRouter;
