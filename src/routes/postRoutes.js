import express from "express";
import { postPost, getPosts } from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, postPost);
router.get("/", getPosts);

export default router;
