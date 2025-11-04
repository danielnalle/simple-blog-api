import express from "express";
import {
  postPost,
  getPosts,
  getPostById,
  putPostById,
  deletePostById,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, postPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, putPostById);
router.delete("/:id", authMiddleware, deletePostById);

export default router;
