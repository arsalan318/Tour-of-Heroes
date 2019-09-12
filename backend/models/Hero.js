const Sequelize = require('sequelize');
const db = require('../config/database');

const Hero = db.define('hero', {
  name: {
    type: Sequelize.STRING
  },
  id:{
      type:Sequelize.NUMBER,
      primaryKey:true
  },
  
},{
    tableName:'hero'
});

module.exports = Hero;