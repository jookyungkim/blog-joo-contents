const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Like extends Model {
  static init(sequelize) {
    return super.init(
      {
        ip: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Like",
        tableName: "Likes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 한글저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Like.belongsTo(db.Post);
  }
};
