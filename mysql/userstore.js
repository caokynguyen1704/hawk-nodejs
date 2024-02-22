const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const UserData = sequelize.define('UserData', {
  userid:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: true
  },
  coin:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  medal:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  diamond:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  level:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  exp:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  rankId:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
  rankPoint:{
    type:DataTypes.BIGINT,
    allowNull: false
  },
});

module.exports = UserData;
