const fs = require("fs").promises;
const mysql = require("mysql");
const path = require("path");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "school_Mini_Project",
});

async function readEntities() {
  try {
    // connect to database
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected to the database!");
    });

    // read the entities files
    const entities = await fs.readdir("./entities");
    for (let entity of entities) {
      const tableName = entity.slice(0, -5);
      const fileData = await fs.readFile(
        path.join(path.resolve("."), "entities", entity),
        {
          encoding: "utf8",
        }
      );
      const parseData = JSON.parse(fileData);

      //   transform each file into querey string
      const columns = Object.keys(parseData)
        .map((key) => `${key} ${parseData[key]}`)
        .join(", ");

      var sql = `CREATE TABLE ${tableName} (${columns})`;

      //   delete if exists:
      con.query(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
        if (err) throw err;
        console.log(`deleted ${tableName} table`);
      });

      //   create the table with the columns
      con.query(sql, (err) => {
        if (err) throw err;
        console.log(`created ${tableName} table`);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

readEntities();
