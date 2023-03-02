const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const { _id: userId } = req.user;
    const fileName = `${userId}_${file.originalname}`;
    cb(null, fileName);
  },
  limits: {
    fileSize: 2048,
  },
});
const upload = multer({ storage: multerConfig });

module.exports = upload;
