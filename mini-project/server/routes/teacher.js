var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", async (req, res, next) => {
  // expected body: {name: , password: , email: }
  try {
    if (!req.body.name || !req.body.password)
      throw new Error("Missing name and/or password in the request's body.");

    checkTeacher(req.body.name, req.body.password);
    

    if (checkThisAdmin === false)
      throw new Error("Access denied, no admin found");
    res.send(`name: ${req.body.name}, password: ${req.body.password}`);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add school, ${err.message}`);
  }
});

module.exports = router;
