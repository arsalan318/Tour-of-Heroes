var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'heros'
});

module.exports = con;


// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('heros', 'root', '', {
//     dialect: 'mysql'
//   })
// module.exports = sequelize