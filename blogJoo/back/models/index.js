const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const search = require("./search");
const tag = require("./tag");
const comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.useranme,
  config.password,
  config
);

db.User = user;
db.Post = post;
db.Search = search;
db.Tag = tag;
db.Comment = comment;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
