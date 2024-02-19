const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const { v4: uuidv4 } = require('uuid');
const Admin = sequelize.define('Admin', {
  ID: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Admin;
