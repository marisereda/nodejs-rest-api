const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { BadRequest } = require("http-errors");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(BadRequest("Invalid file type, avatar should be image"));
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
