const mysql = require("mysql");

function getStudent(WHERE="") {
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
    const sql = `SELECT * FROM student ${WHERE}`
    con.query(sql, (err, result,)=>{
        if (err) throw err;
        console.log(result);
        resolve(result)
        con.end(); 
    });
     
});
}
module.exports.getStudent = getStudent;