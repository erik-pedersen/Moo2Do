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
    todos: [],
    nextId: 1
}

function addToData(title, text) {
    const newItem = {};

    newItem.id = data.nextId;
    data.nextId += 1;

    newItem.title = title;
    newItem.text = text;
    newItem.completed = false;

    data.todos.push(newItem);
}

function deleteData(id) {
    const index = data.todos.findIndex((element) => {
        return element.id === id;
    });

    if (index > -1) {
        data.todos.splice(index, 1);
    } else {
        throw invalidId;
    }
}

function updateData(id, title, text, completed) {
    if (!title || !text) {
        throw invalidBody;
    }
    const index = data.todos.findIndex((element) => {
        return element.id === id;
    });

    if (index > -1) {
        data.todos[index].title = title;
        data.todos[index].text = text;
        data.todos[index].completed = completed;
    } else {
        throw invalidId;
    }
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke :(");
});

app.get("/api/mootodos", (req, res) => {
    res.status(200);
    res.json(data.todos);
});

app.post("/api/mootodos", (req, res) => {
    const item = req.body;
    if (!item) {
        res.status(400);
        throw new Error("Missing body");
    }

    console.log(item.title, item.text);

    if (!item["title"] || !item["text"]) {
        res.status(400);
        throw new Error("Missing title or text");
    }

    addToData(item.title, item.text);
    res.status(200);
    res.send("success");
});

app.put("/api/mootodos", (req, res) => {
    const item = req.body;
    if (!item) {
        res.status(400);
        throw new Error("Missing body");
    }

    if (!item.id || !item.title || !item.text || !("completed" in item)) {
        res.status(400);
        throw new Error("Missing id, title, text");
    }

    try {
        updateData(item.id, item.title, item.text, item.completed);
    } catch (e) {
        if (e instanceof invalidId) {
            throw new Error("Invalid ID provided");
        } else if (e instanceof invalidBody) {
            throw new Error ("Missing title, text or completion");
        }
        res.status(400);
    }

    res.status(200);
    res.send("success");
});

app.delete("/api/mootodos", (req, res) => {
    const item = req.body;
    if (!item || !item.id) {
        res.status(400);
        throw new Error("No ID provided");
    }

    try {
        deleteData(item.id);
    } catch (invalidId) {
        res.status(400);
        throw new Error("That ID does not match any listed IDs");
    }

    res.status(200);
    res.send("success");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
