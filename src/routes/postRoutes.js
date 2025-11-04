import express from "express";
import {
  postPost,
  getPosts,
  getPostById,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, postPost);
router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;
