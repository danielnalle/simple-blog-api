import {
  createComment,
  findCommentByIdWithAuthor,
} from "../models/commentModel.js";
import { postExists } from "../models/postModel.js";

export const postCommentForPost = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: userId } = req.user;

    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId)) {
      return res.status(400).json({
        status: "fail",
        error: {
          code: "INVALID_INPUT",
          message: "ID Post harus berupa angka.",
        },
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        status: "fail",
        error: {
          code: "VALIDATION_ERROR",
          message: "Komentar tidak boleh kosong",
        },
      });
    }

    if (!(await postExists(postId))) {
      return res.status(404).json({
        status: "fail",
        error: {
          code: "RESOURCE_NOT_FOUND",
          message: `Postingan dengan ID ${postId} tidak ditemukan.`,
        },
      });
    }

    const newCommentData = await createComment(content, userId, postId);

    const commentWithAuthor = await findCommentByIdWithAuthor(
      newCommentData.id
    );

    return res.status(201).json({
      status: "success",
      data: commentWithAuthor,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(400).json({
        status: "fail",
        error: {
          code: "INVALID_USER",
          message: "User yang dimaksud tidak ditemukan.",
        },
      });
    }

    return res.status(500).json({
      status: "error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Terjadi kesalahan pada server.",
      },
    });
  }
};
