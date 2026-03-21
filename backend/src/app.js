import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

// Middelewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);


// middleware d'erreur TOUJOURS en dernier
app.use(errorHandler);

export default app;
