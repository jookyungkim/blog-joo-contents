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
        ["id", "DESC"],
        ["createdAt", "DESC"],
        // [Comment, "createdAt", "DESC"],
      ],
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
        // {
        //   model: Comment,
        //   include: [{ model: User, attributes: ["id", "name"] }],
        // },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:text", async (req, res, next) => {
  // GET /posts/html

  try {
    let postFull = null;

    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const category = await Category.findOne({
      where: { name: req.params.text },
    });

    if (category) {
      // 카테고리 조회
      let categoryWhere = { id: category.id };
      if (!category.parentId) {
        const childs = await Category.findAll({
          where: { parentId: category.id },
        });

        const categorysIds = childs.map((category) => category.id);
        categoryWhere = { id: { [Op.in]: categorysIds } };
      }
      postFull = await Post.findAll({
        where,
        limit: 10,
        order: [
          ["id", "DESC"],
          ["createdAt", "DESC"],
        ],
        include: [
          {
            model: Category,
            as: "CategoryPosts",
            where: categoryWhere,
          },
          {
            model: User,
            attributes: ["id", "nickname"],
          },
          {
            model: Image,
          },
        ],
      });
    } else {
      // title 와 contnet 조회
      where.title = { [Op.like]: "%" + req.params.text + "%" };
      where.content = { [Op.like]: "%" + req.params.text + "%" };
      postFull = await Post.findAll({
        where,
        limit: 10,
        order: [
          ["id", "DESC"],
          ["createdAt", "DESC"],
        ],
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
        ],
      });
    }

    res.status(200).json(postFull);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/tag/:keyword", async (req, res, next) => {
  // GET /posts/tag/과일

  console.log("keyword ", req.params.keyword);
  try {
    const hashtag = await Hashtag.findOne({
      where: { keyword: req.params.keyword },
    });

    if (!hashtag) {
      return res.status(403).send("존재하지 않는 해쉬테그 입니다.");
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
      order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
      ],
      include: [
        {
          model: Hashtag,
          as: "postHashtags",
          where: { id: hashtag.id },
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        // {
        //   model: Comment,
        //   include: [{ model: User, attributes: ["id", "name"] }],
        // },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/sub/linkPages", async (req, res, next) => {
  // GET /posts/subLinkPages

  // req.query.targetId  3
  // req.query.limit     4
  // req.query.offset    2
  console.log("subLinkPages : ", req.query);
  // return res.status(200).json(false);
  const targetId = parseInt(req.query.targetId, 10);
  const limit = parseInt(req.query.limit, 10);
  let offset = parseInt(req.query.offset, 10);

  try {
    const where = {};
    let postMaxId = await Post.max("id", {
      where: { id: { [Op.lt]: targetId } },
    }); // 10 // < targetId

    if (postMaxId - offset < 0) {
      postMaxId = 0;
    } else {
      postMaxId = postMaxId - offset;
    }
    where.id = { [Op.gte]: postMaxId };

    const posts = await Post.findAll({
      where,
      limit: limit,
      order: [["id", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/images/slider", async (req, res, next) => {
  // GET /posts/images/slider
  // console.log("동작 확인");
  try {
    const postFull = await Post.findAll({
      limit: parseInt(req.query.limit, 10),
      order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
      ],
      include: [
        {
          model: Image,
        },
      ],
    });

    res.status(200).json(postFull);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
