const todos = document.getElementById("todos");
const newButton = document.getElementById("newTodo");

function handleGet() {
    fetch("/api/mootodos")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            const el = document.createElement("div");
            const title = document.createElement("p");
            title.innerText = "Title: " + item.title;
            const completed = document.createElement("p");
            completed.innerText = "Completed: " + item.completed;
            const text = document.createElement("p");
            text.innerText = "Contents: " + item.text;

            el.appendChild(title);
            el.appendChild(text);
            el.appendChild(completed);
            el.id = item.id;
            el.name = "todo-item";

            const deleteButton = document.createElement("button");
            deleteButton.addEventListener("click", () => handleDelete(item.id));
            deleteButton.innerText = "Delete";
            const updateButton = document.createElement("button");
            updateButton.addEventListener("click", () => handleUpdate());
            updateButton.innerText = "Update";

            el.appendChild(deleteButton);
            el.appendChild(updateButton);

            todos.appendChild(el);
        })
    });
}

function handleDelete(id) {
    fetch("/api/mootodos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
            "id": id
        })
    });
    window.location.reload();
}

function handleUpdate() {
    console.log("update does nothing for now :(");
}

newButton.addEventListener("click", () => {
    const title = document.getElementById("todoTitle").value;
    const text = document.getElementById("todoText").value;

    console.log(title);
    console.log(text);

    // create new child
    fetch("/api/mootodos", {
            method: "POST", 
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify({
                "title": title,
                "text": text
            })
        });

    window.location.reload();
});

window.onload=handleGet
