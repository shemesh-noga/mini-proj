var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { checkExist } = require("../utils/checkExist");
const { addTeacher } = require("../utils/addTeacher");
const { changeInfo } = require("../utils/changeInfo");

/* GET home page. */
router.get("/:id", async (req, res, next) => {
  try {
    const teacher = await getTeacher(req.params.id);

    if (teacher.length === 0) throw new Error("Teacher doesn't exist");
  } catch (err) {}
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
    res.send(req.params.id);
    const sql = `UPDATE teacher SET ? WHERE id = ?`;
    changeInfo(sql, req);
  } catch (err) {
    console.error(err);
    res
      .status(404)
      .send(`Error: Couldn't change teacher's info, ${err.message}`);
  }
});

function getTeacher(id) {
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
    if (err) throw err;
    console.log(result);
    return result;
  });
}

module.exports = router;
