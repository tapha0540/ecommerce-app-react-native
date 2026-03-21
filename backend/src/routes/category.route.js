import { Router } from "express"
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import CategoryController from "../controllers/category.controller.js";


const categoryRouter = Router();

categoryRouter.get("/", asyncHandler(CategoryController.getAllCategories));
categoryRouter.get("/:id", asyncHandler(CategoryController.getCategory));


export default categoryRouter;