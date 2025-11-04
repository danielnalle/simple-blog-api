import * as db from "../config/db.js";

export const createPost = async (title, content, userId) => {
  const newPost = await db.query(
    "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id, created_at, updated_at",
    [title, content, userId]
  );

  return newPost.rows[0];
};

export const findAllPosts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const countResult = await db.query("SELECT COUNT(*) FROM posts");
  const totalItems = parseInt(countResult.rows[0].count, 10);

  const postsResult = await db.query(
    `SELECT p.id, p.title, p.created_at, u.username AS author_username FROM posts p LEFT JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  return {
    posts: postsResult.rows,
    totalItems: totalItems,
  };
};

export const findPostById = async (postId) => {
  const postResult = await db.query(
    "SELECT p.id, p.title, p.content, p.created_at, p.updated_at, u.id AS author_id, u.username AS author_username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = $1",
    [postId]
  );

  const postData = postResult.rows[0];

  if (!postData) {
    return null;
  }

  const formattedPost = {
    id: postData.id,
    title: postData.title,
    content: postData.content,
    created_at: postData.created_at,
    updated_at: postData.updated_at,
    author: {
      id: postData.author_id,
      username: postData.author_username,
    },
  };

  return formattedPost;
};

export const updatePost = async (postId, title, content, userId) => {
  const updatedPost = await db.query(
    "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING title, content, updated_at",
    [title, content, postId, userId]
  );

  return updatedPost;
};

export const deletePost = async (postId, userId) => {
  const deletedPost = await db.query(
    "DELETE FROM posts WHERE id = $1 AND user_id = $2",
    [postId, userId]
  );

  return deletedPost;
};
