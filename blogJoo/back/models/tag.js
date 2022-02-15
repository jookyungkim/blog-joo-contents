const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Tag extends Model {
  static init(sequelize) {
    return super.init(
      {
        keyword: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Tag",
        tableName: "tags",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
};
