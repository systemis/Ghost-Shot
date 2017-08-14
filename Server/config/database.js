const mysql = require('mysql');
module.exports = mysql.createConnection({
    connectionLimit: 1000,
    host: 'localhost',
    port: 8888,
    user: 'root',
    password: 'root',
    database: 'photoapp',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})