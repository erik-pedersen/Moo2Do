document.getElementById('todoForm').addEventListener('submit', event => {
    event.preventDefault();
    createTodo(document.getElementById('textbox').value);
})

async function deleteTodo(id) {
    const resp = await fetch('http://localhost:3000/api/todo', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            id: id,
        })
    });

    const li = document.getElementById(`li${id}`);
    li.parentNode.removeChild(li);
    const todos = document.getElementById('todos');
    if (todos.childElementCount === 0) {
        const b = document.createElement('b');
        b.id = "allDoneText";
        b.textContent = "All done! 🐮✅";
        todos.appendChild(b);
    }
}

async function editTodo(id, text, completed) {
    const resp = await fetch('http://localhost:3000/api/todo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            id: id,
            text: text,
            completed: completed
        })
    });
    const rest = await resp.json();
    const todo = rest.data.todo;

    const li = document.getElementById(`li${id}`);
    li.parentNode.removeChild(li);
    createTodoProperties(id, text, completed);
}

async function getTodos() {
    const resp = await fetch('http://localhost:3000/api/todo')
    const resu = await resp.json();
    let flag = false;
    for (let e of resu.data.todos) {
        flag = true;
        createTodoProperties(e.id, e.text, e.completed);
    }

    if (!flag) {
        const b = document.createElement('b');
        b.textContent = "All done! 🐮✅";
        b.id = "allDoneText";
        document.getElementById("todos").appendChild(b);
    }
}

function createTodoProperties(id, text, completed) {
    const li = document.createElement('li');
    li.id = `li${id}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox${id}`;

    const label = document.createElement('label');
    label.htmlFor = `checkbox${id}`;
    label.id = `label${id}`;
    label.textContent = text;

    const button = document.createElement('button');
    button.id = `button${id}`;
    button.textContent = 'delete';

    button.addEventListener('click', () => {
        deleteTodo(id);
    })

    const editButton = document.createElement('button');
    editButton.id = `editButton${id}`;
    editButton.textContent = 'edit';

    editButton.addEventListener('click', () => {
        const newText = prompt("Enter new text:");
        editTodo(id, newText, completed);
    })

    if (completed) {
        checkbox.checked = true;
    } else {
        checkbox.removeAttribute('checked');
    }

    checkbox.addEventListener('change', () => {
        editTodo(id, text, checkbox.checked)
    })

    if (completed) {
        const s = document.createElement('s');
        s.id = `s${id}`;
        s.appendChild(checkbox);
        s.appendChild(label);
        li.appendChild(s);
    } else {
        li.appendChild(checkbox);
        li.appendChild(label);
    }
    li.appendChild(button);
    li.appendChild(editButton);

    document.getElementById('todos').appendChild(li);
}

async function createTodo(text) {
    const resp = await fetch('http://localhost:3000/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            text: text
        })
    });
    const resu = await resp.json();
    const todo = resu.data.todo;

    createTodoProperties(todo.id, todo.text, todo.completed);
    document.getElementById('textbox').value = '';

    const b = document.getElementById('allDoneText');
    if (b) {
        b.parentNode.removeChild(b);
    }
};

getTodos();
