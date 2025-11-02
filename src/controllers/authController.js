import bcrypt from "bcryptjs";
import * as db from "../config/db.js";

export const postRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username",
      [username, email, passwordHash]
    );

    res.status(201).json({ status: "success", data: newUser.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Terjadi kesalahan pada server.",
      },
    });
  }
};
