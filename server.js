const express = require('express');
const PORT = 3000
const app = express();
const logger = require('morgan');
// const mysql = require('mysql');
const path = require("path");

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "username",
//     password: "password"
// });

// temporary in-memory database:

data = {
    todos: [
        {
            id: 1,
            title: "First",
            text: "This is a todo item",
            completed: true
        },
        {
            id: 2,
            title: "Another todo",
            text: "This is another todo item",
            completed: false
        },
    ],
    nextId: 3
}

// con.connect( (err) => {
//     if (err) throw err;
//     console.log("Connected to MySQL database.\n");
// });

app.use(logger("dev"));

app.use(express.static("public"));

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke :(");
});

app.get("/api/mootodos", (req, res) => {
    res.status(200)
    res.json(data.todos)
});

app.post("/api/mootodos", (req, res) => {
    res.status(200)
    const item = req.body
    console.log(item)
    // create new todo item
});

app.put("/api/mootodos", (req, res) => {
    res.status(200)
    // update todo item
});

app.delete("/api/mootodos", (req, res) => {
    res.status(200)
    // delete a todo item
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
