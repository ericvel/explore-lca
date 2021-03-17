const functions = require("firebase-functions");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: functions.config().mysql.host,
  user: functions.config().mysql.user,
  password: functions.config().mysql.pwd,
  database: functions.config().mysql.db,
  ssl: {
    ca: Buffer.from(functions.config().mysql.sslca, "base64").toString("ascii"),
    key: Buffer.from(functions.config().mysql.sslkey, "base64").toString(
      "ascii"
    ),
    cert: Buffer.from(functions.config().mysql.sslcert, "base64").toString(
      "ascii"
    ),
  },
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

pool.config.connectionConfig.namedPlaceholders = true;

module.exports = pool;
