const mysql = require("mysql");

const pool = mysql.createPool({
  // NEW HOSTING
  host: "s13.hosterpk.com",
  user: "digita87_muddassir",
  password: "Developers000$$$",
  database: "digita87_dummy"
});

module.exports = pool;