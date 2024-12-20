// backend/routes/music.js
const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 음악 파일 업로드(라이브러리 저장)
router.post(
  "/upload",
  authMiddleware,
  upload.single("music"),
  musicController.uploadMusic
);

// 사용자의 음악 목록 조회
router.get("/user", authMiddleware, musicController.getUserMusic);

// 음악 삭제 라우트 추가
router.delete("/:id", authMiddleware, musicController.deleteMusic);

module.exports = router;
