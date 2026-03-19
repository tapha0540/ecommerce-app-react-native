import cors from "cors";
import express from "express";
import userRoutes from "./routes/user.routes.js";


const app = express();

// Middelewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes

// app.get("/", (req, res) => {
//   res.end(`${DB_HOST}, ${DB_NAME}, ${DB_USER}, ${DB_PORT}, ${DB_PASSWORD}`);
// });
app.use("/users", userRoutes);

export default app;
