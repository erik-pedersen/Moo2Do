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

app.get("/mootodo", (req, res) => {
    // get todo items
});

app.post("/mootodo", (req, res) => {
    // create new todo item
});

app.put("/mootodo", (req, res) => {
    // update todo item
});

app.delete("/mootodo", (req, res) => {
    // delete a todo item
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
