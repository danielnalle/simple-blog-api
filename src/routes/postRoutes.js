import express from "express";
import {
  postPost,
  getPosts,
  getPostById,
  putPostById,
  deletePostById,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import commentRoutes from "./commentRoutes.js";

const router = express.Router();

router.post("/", authMiddleware, postPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, putPostById);
router.delete("/:id", authMiddleware, deletePostById);

router.use("/:id/comments", commentRoutes);

export default router;
