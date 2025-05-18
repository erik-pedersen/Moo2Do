const todos = document.getElementById("todos");
const newButton = document.getElementById("new");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");

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
            el.appendChild(completed);
            el.appendChild(text);
            el.id = item.id;
            el.name = "todo-item";

            todos.appendChild(el);
        })
    });



newButton.addEventListener("click", () => {
    // create new child
    console.log("DEBUG: creating new todo item");
    fetch("/api/mootodos", {method: "POST", body: JSON.stringify(
        {
            title: "New 2do",
            text: "A new todo item",
            completed: false
        }
    )});
});

editButton.addEventListener("click", () => {
    // create new child
    console.log("DEBUG: editing selected todo item");
});

deleteButton.addEventListener("click", () => {
    // create new child
    console.log("DEBUG: deleting todo item");
});

