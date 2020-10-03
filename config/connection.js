const mysql = require("mysql");

const connectionConfig = {
    host: "localhost",
    port: 8080,
    user: "root",
    password: "root",
    // database: ""
};

const connection = mysql.createConnection(connectionConfig);

module.exports = connection;