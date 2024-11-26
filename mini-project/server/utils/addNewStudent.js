const mysql = require("mysql");

function addStudent(sql, req) {
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
      [req.body.name, req.body.password, req.body.classroomId], 
      (err, result) => {
        if (err) {
          reject(err); 
        } else {
          console.log("1 record inserted");
          const newStudent = {
            id: result.insertId,
            name: req.body.name,
            password: req.body.password,
            email: req.body.classroomId,
          };
          resolve(newStudent); 
          con.end(); 
        }
    });
  });
}
module.exports.addStudent = addStudent;
