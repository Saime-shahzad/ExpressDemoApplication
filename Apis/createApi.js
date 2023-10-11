const express = require("express");
const router = express.Router();
const pool = require("../Utils/db");
const tableName = require("../tableNames/tableNames");

router.get("/insertApi", (req, res) => {
  console.log("req.body >>>>");
  let payload = {
    tableName: tableName.testing,
    databaseFields: {
      userName: "saad khan",
    },
  };
  // // console.log(payload);
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("eror >>>", err);
      }
      connection.query(
        `INSERT INTO ${payload.tableName} SET ?`,
        payload.databaseFields,
        (err, result) => {
          connection.release();
          if (err) {
            res.send("error");
          } else {
            res.send("successfully inserted");
          }
        }
      );
    });
  } catch (error) {
    console.log("error");
    // console.log("error");
  }
});

module.exports = router;
