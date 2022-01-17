const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /post
  try {
    res.status(200).send("post info");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
