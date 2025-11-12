const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "23503") {
    return res.status(400).json({
      status: "fail",
      error: {
        code: "INVALID_USER",
        message: "User yang dimaksud tidak ditemukan.",
      },
    });
  }

  res.status(500).json({
    status: "error",
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan yang tidak terduga pada server.",
    },
  });
};

export default errorHandler;
