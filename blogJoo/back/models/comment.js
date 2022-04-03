const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        cancelYn: {
          type: DataTypes.STRING(1),
          allowNull: true,
        },
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 한글저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.hasMany(db.Comment, {
      as: "subComments",
      foreignKey: "parentId",
    });
  }
};
