var mysql = require('mysql');

var con = mysql.createConnection({
    host: "if.unismuh.ac.id",
    database: "mahasiswa"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("\n Database Berhasil Terhubung");
});

module.exports = con;
