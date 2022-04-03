const express = require("express");
const { Search } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /searchs
  try {
    const searchFull = await Search.findAll({
      where: { id: req.params.commetId },
    });
    res.status(201).json(searchFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
