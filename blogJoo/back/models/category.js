const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        // parent_no: {
        //   type: DataTypes.INTEGER,
        //   // allowNull: false,
        // },
      },
      {
        modelName: "Category",
        tableName: "categorys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 한글저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Category.belongsToMany(db.Post, {
      through: "categoryPost",
      as: "categoryPosts",
    });

    db.Category.hasMany(db.Category, {
      as: "SubCategorys",
      foreignKey: "parentId",
    });
  }
};
