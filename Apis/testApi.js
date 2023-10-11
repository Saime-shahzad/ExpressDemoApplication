const express = require("express");
const router = express.Router();
const tableName = require("../tableNames/tableNames");
const pool=require("../Utils/db")

const response = require("../GlobalRespose/globalResponse");
const axios=require("axios")


////randome userdataa work//


// async function getdata() {
//     try {
//         const response = await axios.get('https://randomuser.me/api/')
//         const datas = response.data.results[0]
//         return datas
//       } catch (error) {
//         console.error('Error fetching random user data:', error)
//         throw error;
//       }
//   }



router.get("/createTestApi", (req, res) => {
//     getdata()
//   .then((datas) => {
//             res.send(datas);
            
//         })
//         .catch((error) => {
//       res.send(error);
//   });
   
//close///



  let payload = {
    tableName: tableName.testing,
  
  };
  try {
    pool.getConnection( (err, connection) => {
      if (err) {
        console.log("eror >>>", err);
        
      }
      connection.query(
        `SELECT * FROM ${payload.tableName}`,
       

        (err, result) => {
          connection.release();

          if (err) {
            console.log(err);
            return res.send("error");
          } else {
              return res.send(response(result));
          }
        }
      );
    });
  } catch (err) {
    return res.send("error>");
  }



   
     

});

module.exports = router;
