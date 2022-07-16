require('dotenv').config();
const mysql = require('mysql2');

let connection;

if(process.env.JAWSDB_URL){
    connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'todos_db',
    }).promise();
}else{
    connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'todos_db',
    }).promise();
}


module.exports = connection;