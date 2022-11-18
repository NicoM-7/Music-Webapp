const mysql = require('mysql2');

function newConn() {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'lab3db'
    });
    return conn;
}

module.exports = newConn;