import Router from "express";
import ProductController from "../controllers/product.controller.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const productRouter = Router();

productRouter.get("/:id", asyncHandler(ProductController.getProduct));
productRouter.get("/", asyncHandler(ProductController.getProducts));

export default productRouter;
