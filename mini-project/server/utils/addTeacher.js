const mysql = require("mysql");
const path = require("path");

function addTeacher(name, password, email) {
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

    const sql = `INSERT INTO teacher (name, password, email) VALUES (?,?,?)`;

    con.query(sql, [name, password, email], (err, result) => {
      if (err) {
        reject(err); // Reject on error
      } else {
        console.log("1 record inserted");
        resolve(result); // Resolve with the result
      }
      con.end(); // Ensure to close the connection
    });
  });
}
  // addTeacher("Jonney", "Jonney123", "jonney123@gmail.com")
module.exports.addTeacher = addTeacher;
