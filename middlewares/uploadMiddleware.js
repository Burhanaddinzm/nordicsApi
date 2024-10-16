const multer = require("multer");
const upload = require("../config/multerConfig");

const maxFileSize = process.env.MAX_FILE_SIZE;
const singleImageUpload = upload.single("image");

const uploadMiddleware = (req, res, next) => {
  singleImageUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: 400,
          message: `File too large. Max size is ${maxFileSize}MB`,
        });
      }
      return res.status(400).json({ status: 400, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 400,
        message: "No file uploaded or file type not allowed",
      });
    }

    next();
  });
};

module.exports = uploadMiddleware;
