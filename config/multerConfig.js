const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { lookup } = require("mime-types");

const maxFileSize = Number(process.env.MAX_FILE_SIZE);
const allowedFileTypes = process.env.FILE_TYPES.split(",").map((type) =>
  type.trim()
);

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = allowedFileTypes.map((type) => lookup(type));

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Only ${allowedFileTypes.join(", ")} are allowed`
      )
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize * 1024 * 1024 }, // MB
  fileFilter: fileFilter,
});

module.exports = upload;
