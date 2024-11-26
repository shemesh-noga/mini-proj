var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const checkExist = require("../utils/checkExist.js").checkExist;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST */
router.post("/", async (req, res, next) => {
  // expected body: {schoolName: , schoolCode: , name: , password: }
  try {
    if (!req.body.name || !req.body.password)
      throw new Error("Missing name and/or password in the request's body.");
    // if (!req.body.schoolName || !req.body.schoolCode)
    //   throw new Error(
    //     "Missing school's name and/or password in the request's body."
    //   );

    const admin = await checkExist(req.body.name, req.body.password, "admin");
    if (!admin) throw new Error("Access denied, no admin found");

    res.send(`name: ${req.body.name}, password: ${req.body.password}`);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add school, ${err.message}`);
  }
});

module.exports = router;
