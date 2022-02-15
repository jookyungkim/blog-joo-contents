const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");

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

      const fullUserWithoutPassord = await User.findOne({
        where: { id: user.id },
        // password 빼고 가지고 온다
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassord);
    });
  })(req, res, next);
});

router.post("/logout", async (req, res, next) => {
  // POST /user/logout

  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.get("/loadMyInfo", async (req, res, next) => {
  // GET /user/loadMyInfo
  try {
    if (req.user) {
      const fullUserWithoutPassord = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassord);
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
