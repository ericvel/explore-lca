const functions = require("firebase-functions");
const mysql = require("mysql");

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
