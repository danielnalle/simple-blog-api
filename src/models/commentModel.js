import * as db from "../config/db.js";

export const createComment = async (content, userId, postId) => {
  const newComment = await db.query(
    "INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING id, content, user_id, post_id, created_at",
    [content, userId, postId]
  );

  return newComment.rows[0];
};

export const findCommentByIdWithAuthor = async (commentId) => {
  const result = await db.query(
    "SELECT c.id, c.content, c.created_at, u.id AS author_id, u.username AS author_username FROM comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.id = $1",
    [commentId]
  );

  return result.rows[0];
};
