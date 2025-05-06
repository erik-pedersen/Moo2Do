const express = require('express');
const PORT = 3000
const app = express();
const logger = require('morgan');
const mysql = require('mysql');
const path = require("path");

const con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
});

con.connect( (err) => {
    if (err) throw err;
    console.log("Connected to MySQL database.\n");
});

app.use(logger("dev"));

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke :(");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
