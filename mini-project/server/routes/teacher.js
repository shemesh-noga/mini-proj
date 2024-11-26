var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { checkExist } = require("../utils/checkExist");
const { addTeacher } = require("../utils/addTeacher");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res, next) => {
  // expected body: {name: , password: , email: }
  try {
    if (!req.body.name || !req.body.password || !req.body.email)
      throw new Error("Missing name and/or password and/or email in the request's body.");

    const exsist =await checkExist(req.body.name, req.body.password,"teacher");
    if(exsist)throw new Error("already exists");
    // add new teacher
    const response=addTeacher(req.body.name, req.body.password,req.body.email);
    if(!response)throw new Error ("something went wrong")
    res.status(200).send(`added successfully, ${response}`)
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add teacher, ${err.message}`);
  }
});

module.exports = router;
