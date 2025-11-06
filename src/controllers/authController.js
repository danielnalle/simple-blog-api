import bcrypt from "bcryptjs";
import * as db from "../config/db.js";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/userModel.js";

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: "fail",
        error: {
          code: "VALIDATION_ERROR",
          message: "Semua field wajib diisi.",
        },
      });
    }

    const userExists = await findUser(email);
    if (userExists > 0) {
      return res.status(400).json({
        status: "fail",
        error: {
          code: "VALIDATION_ERROR",
          message: "Email sudah terdaftar.",
        },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await createUser(username, email, passwordHash);

    return res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
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
      return res.status(401).json({
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
    return res.status(500).json({
      status: "error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Terjadi kesalahan pada server.",
      },
    });
  }
};
