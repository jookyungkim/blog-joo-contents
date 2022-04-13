const express = require("express");
const { QueryTypes } = require("sequelize");
const { Hashtag, sequelize } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /hashtags
  try {
    const hashtagFull = await Hashtag.findAll({});
    res.status(201).json(hashtagFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/recent", async (req, res, next) => {
  // 최근검색
  // GET /hashtags/recent
  try {
    let limit = 30;
    if (req.query.limitCount) {
      limit = req.query.limitCount;
    }
    const hashtagFull = await Hashtag.findAll({
      limit: limit,
      order: [["id", "DESC"]],
    });
    res.status(201).json(hashtagFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/popular", async (req, res, next) => {
  // 인기검색
  // GET /hashtags/popular
  try {
    let limit = 30;
    if (req.query.limitCount) {
      limit = req.query.limitCount;
    }
    const hashtagFull = await sequelize.query(
      `SELECT *
         FROM (
                SELECT HASHTAGID
                    , COUNT(POSTID) CNT
                from POSTHASHTAG
                GROUP BY HASHTAGID
                ORDER BY CNT, HASHTAGID desc 
                LIMIT :limit
              ) AA,
              HASHTAGS BB
      
         WHERE AA.HASHTAGID = BB.ID  
      `,
      { replacements: { limit }, type: QueryTypes.SELECT }
    );
    res.status(201).json(hashtagFull);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
