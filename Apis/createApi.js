const express = require("express");
const router = express.Router();
const pool = require("../Utils/db");
const tableName = require("../tableNames/tableNames");

router.post("/insertApi", (req, res) => {
  console.log("res.protocol>>>", req.protocol);
  console.log("res.headers>>>", req.headers);
  let payload = {
    tableName: tableName.testing,
    databaseFields: {
      userName: req.body.userName,
    },
  };
  // // console.log(payload);
  try {
    pool.getConnection(async(err, connection) => {
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
