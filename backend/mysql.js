const mysql = require("mysql2");
const dbconfig = require("./dbconfig");

const pool = mysql.createPool({
  host: dbconfig.MYSQL_HOST,
  user: dbconfig.MYSQL_USER,
  password: dbconfig.MYSQL_PWD,
  database: dbconfig.MYSQL_DB,
  port: dbconfig.MYSQL_PORT,
});

pool.config.connectionConfig.namedPlaceholders = true;

module.exports = pool;
