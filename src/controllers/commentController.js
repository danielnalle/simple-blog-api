import {
  createComment,
  deleteComment,
  findCommentById,
  findCommentByIdWithAuthor,
} from "../models/commentModel.js";
import { findAuthorId, postExists } from "../models/postModel.js";
import asyncHandler from "express-async-handler";

export const postCommentForPost = asyncHandler(async (req, res) => {
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

  const commentWithAuthor = await findCommentByIdWithAuthor(newCommentData.id);

  return res.status(201).json({
    status: "success",
    data: commentWithAuthor,
  });
});

export const deleteCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const commentId = parseInt(id, 10);
  if (isNaN(commentId)) {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "INVALID_INPUT",
        message: "ID Comment harus berupa angka.",
      },
    });
  }

  const commentData = await findCommentById(commentId);
  if (!commentData) {
    return res.status(404).json({
      status: "fail",
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: `Komentar dengan ID ${commentId} tidak ditemukan atau Anda tidak memiliki akses.`,
      },
    });
  }

  const postAuthorId = await findAuthorId(commentData.post_id);

  const isCommentOwner = userId === commentData.user_id;
  const isPostOwner = userId === postAuthorId;

  if (!isCommentOwner && !isPostOwner) {
    return res.status(403).json({
      status: "fail",
      error: {
        code: "FORBIDDEN",
        message: "Anda tidak memiliki izin untuk menghapus komentar ini.",
      },
    });
  }

  await deleteComment(commentId);

  return res.status(204).send();
});
