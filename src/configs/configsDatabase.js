const mysql = require("mysql2");

const pool = mysql.createPool({
  user: process.env.USER || "sql12613633",
  password: process.env.PASSWD || "2Ix4r8REfs",
  host: process.env.HOST || "sql12.freemysqlhosting.net",
  database: process.env.DATABASE || "sql12613633",
  port: process.env.DB_PORT || 3306,
});

module.exports = pool;
