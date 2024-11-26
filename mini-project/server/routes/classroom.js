var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const path = require("path");
const addClassroom = require("../utils/addClassroom").addClassroom;
const checkchoolExist = require("../utils/checkExist.js").checkchoolExist;

/* POST home page. */
router.post("/", async (req, res, next) => {
  // expected body: {grade: , _index: , teacher_id: }
  try {
    if (!req.body.grade || !req.body._index || !req.body.teacher_id)
      throw new Error(
        "Missing name grade/or _index and/or teacher_id in the request's body."
      );

    const classroom = await checkchoolExist(
      req.body.grade,
      req.body._index,
      req.body.teacher_id,
      "classroom"
    );
    if (classroom) throw new Error("Classroom already exists");

    // add new teacher
    const sql = `INSERT INTO classroom (grade, _index, teacher_id) VALUES (?,?,?)`;
    const result = await addClassroom(sql, req);
    console.log("result: ", result);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(404).send(`Error: Couldn't add teacher, ${err.message}`);
  }
});
module.exports = router;
