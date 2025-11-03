import * as db from "../config/db.js";

export const createPost = async (title, content, userId) => {
  const newPost = await db.query(
    "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id, created_at, updated_at",
    [title, content, userId]
  );

  return newPost.rows[0];
};
