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

const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
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
      secure: process.env.NODE_ENV === "production", // https 적용하면 false 에서 true 변경해준다.
      domain: process.env.NODE_ENV === "production" && ".nodejoo.site",
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

// 에러 처리 미들웨어 이다.
// 여기에 소스가 없으면 내부적으로 이쪽에 생성된다.
app.use((err, req, res, next) => {
  console.log("에러 미들웨어 서버 실행 중!");
});

app.listen(3065, () => {
  console.log("서버 실행 중");
});
