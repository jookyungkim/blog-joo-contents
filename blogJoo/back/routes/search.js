const express = require("express");
const { Search, Post } = require("../models");
const { getUserIP } = require("../utill");
const router = express.Router();

router.get("/:searchId", async (req, res, next) => {
  // GET /search/1
  try {
    const saerch = await Search.findOne({
      where: { id: req.params.searchId },
    });
    res.status(201).json(saerch);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // POST /search
  try {
    const search = await Search.create({
      ip: getUserIP(req),
      text: req.body.text,
    });

    const searchFull = await Search.findAll({
      where: { ip: search.ip },
      order: [["id", "DESC"]],
    });

    // const searchUrl = "";
    // await Post.findAll({
    //   where: {title}
    // })
    res.status(201).json(searchFull);

    // res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
