import {
  createPost,
  deletePost,
  findAllPosts,
  findPostById,
  updatePost,
} from "../models/postModel.js";
import asyncHandler from "express-async-handler";

export const postPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "VALIDATION_ERROR",
        message: "Judul dan konten tidak boleh kosong",
      },
    });
  }

  const newPostData = await createPost(title, content, userId);

  return res.status(201).json({
    status: "success",
    data: newPostData,
  });
});

export const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  const { posts, totalItems } = await findAllPosts(page, limit);

  const totalPages = Math.ceil(totalItems / limit);

  return res.status(200).json({
    status: "success",
    metadata: {
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
    },
    data: posts,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "INVALID_INPUT",
        message: "ID Post harus berupa angka.",
      },
    });
  }

  const postData = await findPostById(postId);

  if (!postData) {
    return res.status(404).json({
      status: "fail",
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: `Postingan dengan ID ${postId} tidak ditemukan.`,
      },
    });
  }

  return res.status(200).json({
    status: "success",
    data: postData,
  });
});

export const putPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "INVALID_INPUT",
        message: "ID Post harus berupa angka.",
      },
    });
  }

  if (!title || !content || title.trim() === "" || content.trim() === "") {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "VALIDATION_ERROR",
        message: "Judul dan konten tidak boleh kosong",
      },
    });
  }

  const updatedPostResult = await updatePost(postId, title, content, userId);

  if (updatedPostResult.rowCount === 0) {
    return res.status(404).json({
      status: "fail",
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: `Postingan dengan ID ${postId} tidak ditemukan atau Anda tidak memiliki akses.`,
      },
    });
  }

  return res.status(200).json({
    status: "success",
    data: updatedPostResult.rows[0],
  });
});

export const deletePostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "INVALID_INPUT",
        message: "ID Post harus berupa angka.",
      },
    });
  }

  const deletedPostResult = await deletePost(postId, userId);

  if (deletedPostResult.rowCount === 0) {
    return res.status(404).json({
      status: "fail",
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: `Postingan dengan ID ${postId} tidak ditemukan atau Anda tidak memiliki akses.`,
      },
    });
  }

  return res.status(204).send();
});
