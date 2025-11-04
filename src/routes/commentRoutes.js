import express from "express";
import { postCommentForPost } from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, postCommentForPost);

export default router;
