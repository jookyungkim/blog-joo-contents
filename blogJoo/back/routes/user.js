const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const passport = require("passport");
const { User, Visitant } = require("../models");
const { getUserIP, getKoreaMoment } = require("../utill");
const { isLoggedIn, isNotLoggedIn } = require("./mddlewares");

const today = getKoreaMoment();
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

router.post("/login", isNotLoggedIn, async (req, res, next) => {
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

router.post("/logout", isLoggedIn, async (req, res, next) => {
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

router.post("/visitant", async (req, res, next) => {
  // POST /user/visitant
  const clientIp = getUserIP(req);
  console.log("today ", today);
  try {
    // console.log("client Ip ", req.body.clientIp);
    // if (!req.body.clientIp) res.status(200).send("ip not fiond");
    const cloneToDate = today.clone();
    cloneToDate.startOf("day").fromNow(); // 2022-04-12 00:00:00

    // console.log("today ", today);
    // console.log("cloneToDate : ", cloneToDate);

    const visitant = await Visitant.findOne({
      where: {
        ip: clientIp,
        createdAt: {
          [Op.lte]: today, // <=
          [Op.gte]: cloneToDate, // >=
        },
      },
    });
    if (!visitant) {
      await Visitant.create({
        ip: clientIp,
        createdAt: today,
      });
    }

    return res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/visitantCount", async (req, res, next) => {
  // GET /user/visitantCount

  try {
    const listCount = [];
    const fullCount = await Visitant.count({});

    const cloneToDate = today.clone();
    cloneToDate.startOf("day").fromNow(); // 2022-04-12 00:00:00
    const todayCount = await Visitant.count({
      where: {
        createdAt: {
          [Op.lte]: today, // <=
          [Op.gte]: cloneToDate, // >=
        },
      },
    });

    const yesterday = today.clone(); // 2022-04-12 00:00:00
    yesterday.subtract(1, "days");
    yesterday.endOf("day").fromNow();

    const yesterday2 = today.clone(); // 2022-04-12 23:59:59
    yesterday2.subtract(1, "days");
    yesterday2.startOf("day").fromNow();

    const yesterdayCount = await Visitant.count({
      where: {
        createdAt: {
          [Op.lte]: yesterday, // <=
          [Op.gte]: yesterday2, // >=
        },
      },
    });

    listCount.push(fullCount);
    listCount.push(todayCount);
    listCount.push(yesterdayCount);

    return res.status(200).json(listCount);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
