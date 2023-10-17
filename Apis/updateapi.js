const pool = require("../Utils/db");

const express = require("express");
const tableName = require("../tableNames/tableNames");
const router = express.Router();

router.post("/update" , (req, res) =>{
  

    let payload = {
        id:req.body.id,

        tableName: tableName.testing,
      databasefields:{
        userName:req.body.userName
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