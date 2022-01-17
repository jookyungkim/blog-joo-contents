const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /user
  try {
    res.status(200).send("user info");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // POST /login

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      return res.status(200).send("로그인 성공");
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // POST /logout

  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
