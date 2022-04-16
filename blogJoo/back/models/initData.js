// const { QueryTypes } = require("sequelize");
const { sequelize, User, Category } = require("./index");
// module.exports.dummyDataQuery
module.exports = async () => {
  try {
    if (process.env.NODE_ENV !== "production")
      await User.destroy({ where: {} });

    await User.create({
      email: "kingjook@naver.com",
      password: "$2b$12$nYPZwxrg9EeHqgUsbus5fuOtpS/DzkXD1UzPuGj0AInOlII1GGvv6",
      nickname: "Joo",
    });

    if (process.env.NODE_ENV !== "production")
      await Category.destroy({ where: {} });

    await Category.create({
      id: 1,
      name: "LANGUAGE",
      parentId: null,
    });
    await Category.create({
      id: 2,
      name: "html",
      parentId: 1,
    });
    await Category.create({
      id: 3,
      name: "css",
      parentId: 1,
    });
    await Category.create({
      id: 4,
      name: "javaScript",
      parentId: 1,
    });
    await Category.create({
      id: 5,
      name: "java",
      parentId: 1,
    });
    await Category.create({
      id: 6,
      name: "oracle",
      parentId: 1,
    });
    await Category.create({
      id: 7,
      name: "IDE",
      parentId: null,
    });
    await Category.create({
      id: 8,
      name: "vscode",
      parentId: 7,
    });
    await Category.create({
      id: 9,
      name: "DEV",
      parentId: null,
    });
    await Category.create({
      id: 10,
      name: "git",
      parentId: 9,
    });
    await Category.create({
      id: 11,
      name: "핵심기능구현",
      parentId: 9,
    });
    await Category.create({
      id: 12,
      name: "IT story",
      parentId: null,
    });
    await Category.create({
      id: 13,
      name: "뉴스기사",
      parentId: 12,
    });
  } catch (error) {
    console.log("catch !@#$$$!! ");
    console.error(error);
  }
};
