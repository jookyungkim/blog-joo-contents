const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Search extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Search",
        tableName: "Searchs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
};
