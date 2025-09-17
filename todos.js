class Todo {
    constructor(text) {
        this.text = text;
        this.id = data.nextId;
        this.completed = false;
        data.nextId = data.nextId + 1;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(completed) {
        this.completed = completed;
    }

    setText(text) {
        this.text = text;
    }
}

let data = {
    todos: new Map(),
    nextId: 0
}


/* Creates a todo item
 * @param text {string}
 * @returns integer (0 for success)
 */
export const createTodo = (text) => {
    const id = data.nextId;
    const todo = new Todo(text);
    data.todos.set(id, todo);
    return todo;
}

createTodo("test1");
createTodo("yet another test");

/* Gets all todo items
 * @returns Array[Todo Object]
 */
export const getTodos = () => {
    const retval = [];
    let i = 0;
    for (const todo of data.todos.values()) {
        retval[i] = todo;
        i = i + 1;
    }

    return retval;
}

/* Edits a todo item
 * @param id {integer}
 * @param text {string}
 * @returns integer (0 for success)
 */
export const editTodo = (id, text, completed) => {
    const todoItem = data.todos.get(id);
    todoItem.setText(text);
    todoItem.setCompleted(completed);
    return todoItem;
}

/* Deletes a todo item
 * @param id {integer}
 * @param text {string}
 * @returns integer (0 for success)
 */
export const deleteTodo = (id) => {
    data.todos.delete(id);
}
