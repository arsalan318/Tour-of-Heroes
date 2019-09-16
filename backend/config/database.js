var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a1b2c3d4",
  database:'Heroes'
});

module.exports = con;


// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('heros', 'root', '', {
//     dialect: 'mysql'
//   })
// module.exports = sequelize