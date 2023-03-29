var mysql = require('mysql');

var con = mysql.createConnection({
    host: "if.unismuh.ac.id",
    user: "root",
    password: "mariabelajar",
    database: "mahasiswa",
    port: "3388"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("\n Database Berhasil Terhubung");
});

module.exports = con;