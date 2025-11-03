import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      error: {
        code: "AUTHENTICATION_FAILED",
        message: "Tidak ada token, otorisasi ditolak",
      },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
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
}
