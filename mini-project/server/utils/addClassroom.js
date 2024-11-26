const mysql = require("mysql");

function addClassroom(sql, req) {
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

    con.query(
      sql,
      [req.body.grade, req.body._index, req.body.teacher_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("1 record inserted");
          const newClassroom = {
            id: result.insertId,
            grade: req.body.grade,
            _index: req.body._index,
            teacher_id: req.body.teacher_id,
          };
          resolve(newClassroom);
          con.end();
        }
      }
    );
  });
}
module.exports.addClassroom = addClassroom;
