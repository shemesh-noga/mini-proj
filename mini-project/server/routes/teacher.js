var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { checkExist } = require("../utils/checkExist");
const { addTeacher } = require("../utils/addTeacher");
const { changeInfo } = require("../utils/changeInfo");
const { table } = require("console");

/* GET home page. */
router.get("/:id", async (req, res, next) => {
  try {
    const teacher = await getTeacher(req.params.id);
    if (!teacher) throw new Error("Teacher doesn't exist");

    res.send(teacher);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't get teacher, ${err.message}`);
  }
});

/* POST. */
router.post("/", async (req, res, next) => {
  // expected body: {name: , password: , email: }
  try {
    if (!req.body.name || !req.body.password || !req.body.email)
      throw new Error(
        "Missing name and/or password and/or email in the request's body."
      );

    const teacher = await checkExist(
      req.body.name,
      req.body.password,
      "teacher"
    );
    if (teacher) throw new Error("already exists");
    // add new teacher

    const sql = `INSERT INTO teacher (name, password, email) VALUES (?,?,?)`;
    const result = await addTeacher(sql, req);
    console.log("result: ", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add teacher, ${err.message}`);
  }
});

/* PUT. */
router.put("/:id", async (req, res, next) => {
  // expected body: {name: ?, password: ?, email:? }
  try {
    const teacher = await getTeacher(req.params.id);
    if (!teacher) throw new Error("Teacher doesn't exist");

    const result = await changeInfo(req, "teacher", req.params.id);
    console.log("result: ", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .send(`Error: Couldn't change teacher's info, ${err.message}`);
  }
});

function getTeacher(id) {
  return new Promise((resolve, reject) => {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "z10mz10m",
      database: "school_Mini_Project",
    });

    con.connect(function (err) {
      if (err) {
        reject(err);
        return;
      }
    });

    const sql = `SELECT * FROM teacher WHERE id = ?`;

    con.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      } else if (result.length === 0) {
        resolve(false);
        return;
      } else {
        resolve(result);
        con.end();
      }
    });
  });
}

module.exports = router;
