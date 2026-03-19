import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middelewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// middleware d'erreur TOUJOURS en dernier
app.use(errorHandler);

export default app;
