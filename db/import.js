const utils = require("./utils");
const fs = require("fs");
const { Pool } = require("pg");


// Import du fichier avec les commandes SQL
const dbFilePath = `${__dirname}/populate.sql`;
const sql = fs.readFileSync(dbFilePath).toString();

// Execution des commandes SQL
utils.executeQuery(sql, [], (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Import terminé avec succès");
    }
});


