'use strict';
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Merchant.hasMany(models.Product)
    }
  }
  Merchant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone_number: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (Merchant, options) => {
        const saltRounds = 10;
        Merchant.password = bcrypt.hashSync(Merchant.password, saltRounds);
      },
      beforeUpdate : (Merchant, options) => {
        const saltRounds = 10;
        Merchant.password = bcrypt.hashSync(Merchant.password, saltRounds);
      }
    },
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};