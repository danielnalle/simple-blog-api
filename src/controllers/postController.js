import { createPost } from "../models/postModel.js";

export const postPost = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;

  try {
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
