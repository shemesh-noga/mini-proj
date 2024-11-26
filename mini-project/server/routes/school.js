var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const checkExist = require("../utils/checkExist.js").checkExist;
const checkSchoolExist = require("../utils/checkExist.js").checkSchoolExist;
const addNewSchool = require("../utils/addNewSchool.js").addNewSchool;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST */
router.post("/", async (req, res, next) => {
  // expected body: {schoolName: , schoolCode: , name: , password: }
  try {
    // check that all feilds are defiened
    if (!req.body.name || !req.body.password)
      throw new Error("Missing name and/or password in the request's body.");
    if (!req.body.schoolName || !req.body.schoolCode)
      throw new Error(
        "Missing school's name and/or password in the request's body."
      );

    // valudate the admin
    const admin = await checkExist(req.body.name, req.body.password, "admin");
    if (!admin) throw new Error("Access denied, no admin found");

    // check if a school with this name exists
    const school = await checkSchoolExist(
      req.body.schoolName,
      req.body.schoolCode,
      "school"
    );
    if (school !== false)
      throw new Error(
        "There is already school with this name. try another name."
      );

    // create new school
    const sql = `INSERT INTO school (name, school_code) VALUES (?, ?)`;
    const result = await addNewSchool(sql, req);
    console.log("result: ", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add school, ${err.message}`);
  }
});

module.exports = router;
