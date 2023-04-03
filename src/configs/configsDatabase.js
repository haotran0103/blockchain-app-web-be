const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASSWD ||"",
  database: process.env.DATABASE || 'blockchain_web',
});

module.exports = connection;


