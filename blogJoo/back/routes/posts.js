const express = require("express");
const { Op } = require("sequelize");
const { Post, Image, User, Comment, Hashtag, Category } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      // 보다 작은 거 10개 불러오기
      // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      // Op.lt 이것보다 작은 의미
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:categoryText", async (req, res, next) => {
  // GET /posts/1

  console.log("categoryText ", req.params.categoryText);
  try {
    const category = await Category.findOne({
      where: { name: req.params.categoryText },
    });

    console.log("category : ", category.id);
    if (!category) {
      return res.status(403).send("존재하지 않는 카테고리 입니다.");
    }
    const where = {};
    // where.title = { [Op.like]: "%" + req.params.postText + "%" };

    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      // 보다 작은 거 10개 불러오기
      // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
      // Op.lt 이것보다 작은 의미
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Category,
          as: "categoryPosts",
          where: { id: category.id },
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
