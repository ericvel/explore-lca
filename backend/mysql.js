var mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
  ssl: {
    ca: Buffer.from(process.env.MYSQL_SSL_CA, "base64").toString("ascii"),
    key: Buffer.from(process.env.MYSQL_SSL_KEY, "base64").toString("ascii"),
    cert: Buffer.from(process.env.MYSQL_SSL_CERT, "base64").toString("ascii"),
  },
  connectTimeout: 5000, // 5 seconds
  acquireTimeout: 5000,
  supportBigNumbers: true,
  bigNumberStrings: true,
  typeCast: function (field, next) {
    if (field.type == "NEWDECIMAL") {
      var value = field.string();
      return value === null ? null : parseFloat(Number(value).toFixed(3));
    }
    return next();
  },
});

module.exports = pool;
