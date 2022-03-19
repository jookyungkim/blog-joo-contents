const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Visitant extends Model {
  static init(sequelize) {
    return super.init(
      {
        ip: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Visitant",
        tableName: "visitants",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 한글저장
        sequelize,
      }
    );
  }

  // static associate(db) {}
};
