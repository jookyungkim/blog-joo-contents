const express = require("express");
const { Comment, Post } = require("../models");

const router = express.Router();

router.get("/:commetId", async (req, res, next) => {
  // GET /comment
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commetId },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // POST /comment
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.body.postId, 10) },
    });

    if (!post) {
      return res.status(403).send("게시글인 존재 하지 않습니다.");
    }

    let parentId = await Comment.max("id", { where: { parentId: null } });
    const useId = req.user?.id;
    if (useId) {
      parentId = null;
    }

    const comment = await Comment.create({
      text: req.body.text,
      name: req.body.name,
      password: req.body.password,
      cancelYn: "N",
      PostId: post.id,
      UserId: useId,
      parentId,
    });

    const commentFull = await Comment.findAll({
      where: { PostId: post.id, parentId: null },
      order: [
        ["id", "ASC"],
        [{ model: Comment, as: "subComments" }, "id", "ASC"],
      ],
      include: [
        {
          model: Comment,
          as: "subComments",
        },
      ],
    });
    res.status(201).json(commentFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
