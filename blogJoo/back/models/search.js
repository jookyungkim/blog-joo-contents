const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Search extends Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ip: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Search",
        tableName: "searchs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Search.belongsTo(db.User);
  }
};
