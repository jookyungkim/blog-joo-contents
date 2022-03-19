const express = require("express");
const { Category } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /categorys
  try {
    const categoryFull = await Category.findAll({
      where: { parentId: null },
      include: [
        {
          model: Category,
          as: "SubCategorys",
        },
      ],
    });
    res.status(201).json(categoryFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
