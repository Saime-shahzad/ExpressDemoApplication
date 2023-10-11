const pool = require("../Utils/db");

const express = require("express");
const tableName = require("../tableNames/tableNames");
const router = express.Router();

router.get("/update" , (req, res) =>{
  

    let payload = {
        id:1,

        tableName: tableName.testing,
      databasefields:{
        userName:"khansaad"
      }
      };
      let keys = Object.keys(payload.databasefields);
      let values = Object.values(payload.databasefields);
      try {
          pool.getConnection((err , connection) => {
              if (err){
                  console.log("error");
                }
                let query = `UPDATE ${payload.tableName} SET  ${keys.join(
                    " = ? ,"
                    )} = ? where id = ${payload.id}`;
connection.query(
    query, values,
(err , result) => {
    connection.release()
    if(err){
        res.send("sorry")
    }
    else{
res.send("success")
    }

})

        })
        
    } catch (error) {
        console.log("error");
        
    }
})
module.exports=router