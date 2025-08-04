const { DataTypes } = require("sequelize");
const db = require("../db/config");
const User = require("./User");

const Adress = db.define("Address", {
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    require: true,
  }});
User.hasMany(Adress)
Adress.belongsTo(User);

  module.exports = Adress;
