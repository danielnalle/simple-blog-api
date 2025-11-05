import express from "express";
import {
  postCommentForPost,
  deleteCommentById,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, postCommentForPost);
router.delete("/:id", authMiddleware, deleteCommentById);

export default router;
