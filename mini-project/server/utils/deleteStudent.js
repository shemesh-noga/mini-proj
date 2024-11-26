const mysql = require("mysql");

function deleteStudent(sql) {
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

    con.query(sql, (err, result)=>{
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
          con.end(); 
        })
    });
  }
module.exports.deleteStudent = deleteStudent;
