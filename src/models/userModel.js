import * as db from "../config/db.js";

export const findExistingUser = async (email) => {
  const result = await db.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  return result.rowCount;
};

export const createUser = async (username, email, passwordHash) => {
  const result = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username",
    [username, email, passwordHash]
  );

  return result.rows[0];
};

export const findUser = async (email) => {
  const result = await db.query(
    "SELECT id, username, password_hash FROM users WHERE email = $1",
    [email]
  );

  return result;
};
