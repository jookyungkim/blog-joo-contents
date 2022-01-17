const passport = require("passport");
const { Strategy: localStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          //const result = await bcrypt.compare(password, user.password);
          return done(null, { id: email, password });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
