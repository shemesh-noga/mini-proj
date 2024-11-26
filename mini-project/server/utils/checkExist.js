const mysql = require("mysql");
const path = require("path");

function checkExist(name, password, table) {
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

    const sql = `SELECT * FROM ${table} WHERE name = ? AND password = ?`;

    con.query(sql, [name, password], (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        resolve(false);
      } else {
        resolve(result[0]);
      }
      con.end();
    });
  });
}

function checkSchoolExist(name, table) {
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

    const sql = `SELECT * FROM ${table} WHERE name = ? `;

    con.query(sql, [name], (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        resolve(false);
      } else {
        resolve(result[0]);
      }
      con.end();
    });
  });
}

function checkchoolExist(grade, _index, teacher_id, table) {
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

    const sql = `SELECT * FROM ${table} WHERE grade = ? AND _index = ? AND teacher_id = ? `;

    con.query(sql, [grade, _index, teacher_id], (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length === 0) {
        resolve(false);
      } else {
        resolve(result[0]);
      }
      con.end();
    });
  });
}

module.exports.checkExist = checkExist;
module.exports.checkSchoolExist = checkSchoolExist;
module.exports.checkchoolExist = checkchoolExist;
