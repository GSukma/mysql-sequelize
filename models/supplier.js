"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.supplier.hasMany(models.good, {
        foreignKey: "id_supplier",
      });
    }
  }
  supplier.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "supplier",
    }
  );
  return supplier;
};
