const express = require("express");
const { Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /comments
  // console.log("comments req query : ", req.query.postId);
  try {
    const commentFull = await Comment.findAll({
      where: { PostId: parseInt(req.query.postId, 10), parentId: null },
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
