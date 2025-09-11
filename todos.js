class Todo {
    constructor(text) {
        this.text = text;
        this.id = data.nextId;
        data.nextId = data.nextId + 1;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
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
    data.todos.set(data.nextId, new Todo(text));
    return 0;
}

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
export const editTodo = (id, text) => {
    data.todos.get(id).setText(text);
    return 0;
}

/* Deletes a todo item
 * @param id {integer}
 * @param text {string}
 * @returns integer (0 for success)
 */
export const deleteTodo = (id) => {
    data.todos.delete(id);
}
