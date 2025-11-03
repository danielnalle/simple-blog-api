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
