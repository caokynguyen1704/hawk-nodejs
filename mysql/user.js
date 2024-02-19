const { DataTypes } = require('sequelize');
const sequelize = require('./config');

const UserLog = sequelize.define('UserLog', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  placeId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    // https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=1&size=420x420&format=Png&isCircular=false
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
  code: {
    type: DataTypes.STRING
  },
  isServer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data:{
    type: DataTypes.JSON,
    defaultValue:{}
  }
});

module.exports = UserLog;
