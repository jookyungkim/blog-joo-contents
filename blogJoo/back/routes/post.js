const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag, Image } = require("../models");

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

router.post("/images", upload.single("image"), async (req, res, next) => {
  // POST /post/image
  console.log("file", req.file);
  res.status(201).json(req.file.filename);
  //res.status(201).json(req.files.map((v) => v.filename));
  // s3 적용
  // res.json(req.files.map((v) => v.location.replace(/\/original\//, "/thumb/")));
});

router.post("/image", upload.array("image"), async (req, res, next) => {
  // POST /post/images
  //console.log("files", req.files[0].filename);
  res.status(201).json(req.files[0].filename);
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

router.post("/", async (req, res, next) => {
  // POST /post

  // 정규식 표현식
  // /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/gi

  //   var a =
  //  ` <img src="http://localhost:3065/test_data_1646145745315.png">
  // <img src="http://localhost:3065/test_data_1646145745315.png">
  // <img src="http://localhost:3065/test_data_1646145745315.png">
  // <img src="http://localhost:3065/test_data_1646145745315.png">
  // <img src="http://localhost:3065/test_data_1646145745315.png">`;

  // var b=/(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/gi;
  // var s=a.match(b);

  // console.log(s.map((a) => a.replace(b, "$2")));

  try {
    // post 등록
    const post = await Post.create({
      content: req.body.content,
      title: req.body.title,
      //UserId: req.user.id,
    });

    const hashtags = req.body.content.match(/#[^\s#\+(<)]+/g);

    if (hashtags) {
      // 해쉬테그 등록
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { keyword: tag.slice(1).toLowerCase() },
          })
        )
      );

      await post.addHashtags(result.map((v) => v[0]));
    }

    const regex = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/gi;
    const imageTags = req.body.content.match(regex);

    if (imageTags) {
      const imageSrcs = imageTags.map((src) => src.replace(regex, "$2")); // src만 추출
      // console.log("imageSrcs", imageSrcs);
      const images = await Promise.all(
        imageSrcs.map((image) => Image.create({ src: image }))
      );
      await post.addImages(images);
    }

    // const fullPost = await Post.findOne({
    //   where: { id: post.id },
    // });

    // 이미지 url 등록

    res.status(201).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
