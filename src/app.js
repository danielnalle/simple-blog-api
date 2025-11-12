import express from "express";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use(errorHandler);

export default app;
