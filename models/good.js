"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class good extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.good.hasMany(models.transaction, {
        foreignKey: "id_good",
      });
      models.good.belongsTo(models.supplier, {
        foreignKey: "id_supplier",
      });
    }
  }
  good.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      id_supplier: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true, // enables deletedAt (soft delete)
      timestamps: true, // enables createdAt and updatedAt
      modelName: "good",
    }
  );
  return good;
};
