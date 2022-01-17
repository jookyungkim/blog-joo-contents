const passport = require("passport");
const local = require("./local");

module.exports = () => {
  // 처음 로그인 suer.id 넣어주기
  passport.serializeUser((user, done) => {
    console.log("user", user);
    done(null, user.id);
  });

  // 로그인 완려되고나서 매번 실행
  passport.deserializeUser(async (id, done) => {
    try {
      done(null, { id });
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
