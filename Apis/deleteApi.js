const express=require ("express")
const tableName = require("../tableNames/tableNames")
const pool = require("../Utils/db")
const router=express.Router()

router.post("/delete" ,(req , res) =>{
let payload={
    id:req.body.id,
    tableName: tableName.testing,
}
    try {
        pool.getConnection((err , connection) =>{
            if(err){
                console.log("erros");
            }
            else{
                connection.query(`DELETE FROM ${payload.tableName} WHERE id=${payload.id}` ,
                (err , result) =>{
                    if(err){
                        res.send("sorry")
                    }
                    else{
                        res.send(result)
                    }
                }
                )
            }
        })
    } catch (error) {
        console.log("error in catch");
    }
})

module.exports=router