const mysql = require("mysql");
const path = require("path");

function checkAdmin(name, password) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "school_Mini_Project",
  });

  con.connect(function (err) {
    if (err) throw err;
  });

  const sql = `SELECT * FROM admin WHERE name = ? AND password = ?`;

  con.query(sql, [name, password], (err, result) => {
    if (err) {
      console.log("false");
      console.log(err);
      return false;
    }
    if (result.length === 0) {
      console.log("false");
      console.log("no user");
      return false;
    }
    console.log(result[0]);
    return result[0];
  });
}

module.exports.checkAdmin = checkAdmin;
