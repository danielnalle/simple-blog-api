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

router.route("/").post(authMiddleware, postPost).get(getPosts);
router
  .route("/:id")
  .get(getPostById)
  .put(authMiddleware, putPostById)
  .delete(authMiddleware, deletePostById);

router.use("/:id/comments", commentRoutes);

export default router;
