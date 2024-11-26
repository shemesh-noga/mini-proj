const mysql = require("mysql");

function addNewSchool(sql, req) {
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
      [req.body.schoolName, req.body.schoolCode],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        } else {
          const newSchool = {
            id: result.insertId,
            name: req.body.schoolName,
            school_code: req.body.schoolCode,
          };
          resolve(newSchool);
          con.end();
        }
      }
    );
  });
}

module.exports.addNewSchool = addNewSchool;
