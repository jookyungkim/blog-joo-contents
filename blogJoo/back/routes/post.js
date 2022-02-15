const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// 폴더 생성
try {
  fs.accessSync("uploads");
} catch {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

// multer 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + "_" + new Date().getTime() + ext); // 제로초_15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/images", upload.array("image"), async (req, res, next) => {
  // POST /post/images
  console.log("files", req.files);
  res.status(201).json(req.files.map((v) => v.filename));
  // s3 적용
  // res.json(req.files.map((v) => v.location.replace(/\/original\//, "/thumb/")));
});

router.get("/", async (req, res, next) => {
  // GET /post
  try {
    res.status(200).send("post info");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
