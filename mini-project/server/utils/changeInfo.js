const mysql = require("mysql");

function changeInfo(req, table, givenId) {
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

    const fields = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(req.body);
    values.push(givenId);

    const sql = `UPDATE ${table} SET ${fields} WHERE id = ?`;

    con.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        con.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [givenId],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
              console.log(result);
            }
          }
        );
        con.end();
      }
    });
  });
}
module.exports.changeInfo = changeInfo;
