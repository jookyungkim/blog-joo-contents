const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const categorysRouter = require("./routes/categorys");
const commentRouter = require("./routes/comment");
const commentsRouter = require("./routes/comments");
const searchRouter = require("./routes/search");
const searchsRouter = require("./routes/searchs");
const hashtagsRouter = require("./routes/hashtags");

const db = require("./models");
const passportConfig = require("./passport");
const dummyDataQuery = require("./models/initData");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then((db) => {
    // console.log("db", db);
    console.log("db 연결 성공");
    console.log("*** 초기 데이터 삽입 ***");
    dummyDataQuery();
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: ["https://nodejoo.site", "http://3.36.118.227:80"],
      credentials: true, // 쿠키를 같이 서버에 전달하고 싶으면 credentials 설정을 해줘야한다.(기본 값은 false)
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: process.env.NODE_ENV === "production",
    cookie: {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // https 적용하면 false 에서 true 변경해준다.
      // domain: process.env.NODE_ENV === "production" && ".nodejoo.site",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/categorys", categorysRouter);
app.use("/comment", commentRouter);
app.use("/comments", commentsRouter);
app.use("/search", searchRouter);
app.use("/searchs", searchsRouter);
app.use("/hashtags", hashtagsRouter);

// 에러 처리 미들웨어 이다.
// 여기에 소스가 없으면 내부적으로 이쪽에 생성된다.
app.use((err, req, res, next) => {
  console.log("에러 미들웨어 서버 실행 중!");
});

// app.listen(80, () => {
//   console.log("서버 실행 중");
// });

if (process.env.NODE_ENV === "production") {
  app.listen(80, () => {
    console.log("서버 실행 중");
  });
} else {
  app.listen(3065, () => {
    console.log("서버 실행 중");
  });
}
