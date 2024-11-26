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

    // find the admin's id:
    con.query(
      "SELECT id FROM admin WHERE name = ? AND password = ?",
      [req.body.name, req.body.password],
      (err, adminResult) => {
        if (err) {
          con.end();
          reject(err);
          return;
        }

        if (adminResult.length === 0) {
          con.end();
          reject(new Error("Admin not found or invalid information."));
          return;
        }

        const adminId = adminResult[0].id;

        // Step 2: Insert the new school
        con.query(
          "INSERT INTO school (name, admin_id) VALUES (?, ?)",
          [req.body.schoolName, adminId],
          (err, schoolResult) => {
            if (err) {
              con.end();
              reject(err);
              return;
            }

            const newSchool = {
              id: schoolResult.insertId,
              name: req.body.schoolName,
              admin_id: adminId,
            };

            con.end();
            resolve(newSchool);
          }
        );
      }
    );
  });
}

module.exports.addNewSchool = addNewSchool;
