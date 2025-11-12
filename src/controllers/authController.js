import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findExistingUser, findUser } from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const postRegister = asyncHandler(async (req, res) => {
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

  const userExists = await findExistingUser(email);
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
});

export const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userData = await findUser(email);
  if (userData.rowCount === 0) {
    return res.status(401).json({
      status: "fail",
      error: {
        code: "AUTHENTICATION_FAILED",
        message: "Email tidak terdaftar.",
      },
    });
  }

  const user = userData.rows[0];

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
});
