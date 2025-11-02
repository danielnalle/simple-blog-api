import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/", authRoutes);

export default app;
