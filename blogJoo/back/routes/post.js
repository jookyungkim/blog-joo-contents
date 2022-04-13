const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getUserIP } = require("../utill");

const {
  Post,
  Hashtag,
  Image,
  User,
  Comment,
  Category,
  Like,
} = require("../models");

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

router.get("/:postId", async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(404).send("존재하지 않는 게시글입니다.");
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Category,
          as: "CategoryPosts",
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Hashtag,
          as: "postHashtags",
          attributes: ["id", "keyword"],
        },
        // {
        //   model: Comment,
        //   include: [
        //     {
        //       model: Comment,
        //       as: "subComments",
        //     },
        //   ],
        // },
      ],
    });

    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // POST /post
  // console.log("comboBox : ", req.body.comboBox);
  try {
    const category = await Category.findOne({
      where: { id: parseInt(req.body.comboBox) },
    });

    if (!category) {
      res.status(403).send("존재하지 않는 카테고리 입니다.");
    }
    // post 등록
    const post = await Post.create({
      content: req.body.content,
      title: req.body.title,
      //UserId: req.user.id,
    });

    post.addCategoryPosts(category.id);

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

    // 이미지 url 등록
    if (imageTags) {
      const imageSrcs = imageTags.map((src) => src.replace(regex, "$2")); // src만 추출
      // console.log("imageSrcs", imageSrcs);
      const images = await Promise.all(
        imageSrcs.map((image) => Image.create({ src: image }))
      );
      await post.addImages(images);
    }

    res.status(201).json(post.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/unlike", async (req, res, next) => {
  // POST /post/1/like
  const ip = getUserIP(req);
  console.log("/unlike** ", req.body);

  try {
    if (!ip) {
      return res.status(403).send("ip 주소가 없습니다.");
    }

    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글인 존재 하지 않습니다.");
    }

    const like = await Like.findOne({ where: { ip } });
    if (!like) {
      return res.status(403).send("좋아요 클릭한게 존재하지 않습니다.");
    }

    Like.destroy({ where: { id: like.id } });

    res.status(200).send(false);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/like", async (req, res, next) => {
  // POST /post/1/like

  const ip = getUserIP(req);
  console.log("like** ", ip);

  try {
    if (!ip) {
      return res.status(403).send("ip 주소가 없습니다.");
    }

    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글인 존재 하지 않습니다.");
    }

    const like = await Like.findOne({ where: { ip } });
    if (like) {
      return res.status(403).send("이미 좋아요 클릭 했습니다.");
    }

    const addLike = await Like.create({
      ip,
      PostId: post.id,
    });

    //const { id } = addLike;

    res.status(200).json(true);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/isLike", async (req, res, next) => {
  // POST /post/1/isLike
  const ip = getUserIP(req);
  console.log("isLike** ", ip);

  // return res.status(200).json(ip);
  try {
    if (!ip) {
      return res.status(403).send("ip 주소가 없습니다.");
    }

    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글인 존재 하지 않습니다.");
    }

    const like = await Like.findOne({
      where: { ip, PostId: parseInt(req.params.postId, 10) },
    });
    if (like) {
      return res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", async (req, res, next) => {
  // DELETE /post/1
  try {
    await Post.destroy({
      where: { id: parseInt(req.params.postId) },
    });
    res.status(200).json({ PostId: req.params.postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId", async (req, res, next) => {
  // PATCH /post/1

  try {
    const category = await Category.findOne({
      where: { id: parseInt(req.body.comboBox) },
    });

    if (!category) {
      return res.status(403).send("존재하지 않는 카테고리 입니다.");
    }

    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
    });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }

    console.log("back ", req.body.content);
    await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: post.id },
      }
    );

    post.setCategoryPosts(category.id);
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

      await post.setHashtags(result.map((v) => v[0]));
    }

    const regex = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/gi;
    const imageTags = req.body.content.match(regex);

    // 이미지 url 등록
    if (imageTags) {
      await Image.destroy({ where: { PostId: post.id } });
      const imageSrcs = imageTags.map((src) => src.replace(regex, "$2")); // src만 추출
      // console.log("imageSrcs", imageSrcs);
      const images = await Promise.all(
        imageSrcs.map((image) => Image.create({ src: image }))
      );
      await post.addImages(images);
    }

    res.status(200).json({ title: req.body.title, content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
