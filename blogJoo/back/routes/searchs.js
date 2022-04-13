const express = require("express");

const { Search } = require("../models");
const { getUserIP } = require("../utill");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /searchs
  try {
    const searchFull = await Search.findAll({});
    res.status(201).json(searchFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/userIp", async (req, res, next) => {
  // GET /searchs/userIp
  const ip = getUserIP(req);
  try {
    const searchFull = await Search.findAll({
      where: { ip },
      limit: 20,
      order: [["id", "DESC"]],
    });
    res.status(201).json(searchFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
