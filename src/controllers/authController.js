import bcrypt from "bcryptjs";
import * as db from "../config/db.js";
import jwt from "jsonwebtoken";

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

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await db.query(
      "SELECT id, username, password_hash FROM users WHERE email = $1",
      [email]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({
        status: "fail",
        error: {
          code: "AUTHENTICATION_FAILED",
          message: "Email atau password yang anda masukkan salah",
        },
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.status(200).json({ status: "success", token: token });
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
