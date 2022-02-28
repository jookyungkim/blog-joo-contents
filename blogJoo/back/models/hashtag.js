const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Tag extends Model {
  static init(sequelize) {
    return super.init(
      {
        keyword: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Hashtag",
        tableName: "tags",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associzte(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "postHashtag" });
  }
};
