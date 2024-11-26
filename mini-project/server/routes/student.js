var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { checkExist } = require("../utils/checkExist");
const { addStudent } = require("../utils/addNewStudent");



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
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

module.exports = router;
