var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { checkExist } = require("../utils/checkExist");
const { addStudent } = require("../utils/addNewStudent");
const { deleteStudent } = require("../utils/deleteStudent");
const { getStudent } = require("../utils/getStudent");



/* GET home page. */
router.get("/", async (req, res, next)=>{
  try{
    const students = await getStudent()
    res.send(students);
  }catch(err){
    console.error(err);
    res.status(404).send(`Error: Couldn't get students, ${err.message}`);
  }
});

router.get("/classroom/:classID", async (req, res, next)=>{
  try{
    const where= `WHERE classroom_id = ${req.params.classID}`
    const students = await getStudent(where)
    res.send(students);
  }catch(err){
    console.error(err);
    res.status(404).send(`Error: Couldn't get students, ${err.message}`);
  }
});


router.post("/", async (req, res, next) => {
  // expected body: {name: , password: , classroomId: }
  try {
    if (!req.body.name || !req.body.password || !req.body.classroomId)
      throw new Error("Missing name and/or password and/or claddroomId in the request's body.");

    const student =await checkExist(
      req.body.name,
      req.body.password,
      "student"
    );
    if(student)throw new Error("already exists");
    // add new student
    const sql =`INSERT INTO student (name, password, classroom_id) VALUES (?,?,?)`;
    const result = await addStudent(sql, req);
    console.log("result: ", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add student, ${err.message}`);
  }
});

router.delete("/:id", async (req,res)=>{
  try {
  var sql = `DELETE FROM student WHERE id =${req.params.id} `;
  deleteStudent(sql)
  res.send(`student whith id ${req.params.id} deleted successfully`);
  }catch(err){
    console.error(err);
    res.status(404).send(`Error: Couldn't delete student, ${err.message}`);
  }

})


module.exports = router;
