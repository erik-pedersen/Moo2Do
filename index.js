import express from 'express';
import { dirname } from 'path';
import path from 'path';
import { getTodos, createTodo, editTodo, deleteTodo } from './todos.js';

const app = express();

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'static'));
});

// Test API
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from API!' });
});

/* gets all todo items */
app.get('/api/todo', (req, res) => {
    const todos = getTodos();

    res.json(
        {
            success: true,
            data: {
                todos: todos
            }
        }
    );
});

/* creates new todo item
 * @param text {string}
 */
app.post('/api/todo', (req, res) => {
    const text = req.body.text;
    const todo = createTodo(text);

    res.json(
        { 
            success: true,
            data: {
                todo: todo
            }
        }
    );
});

/* edits a todo item
 * @param text {string}
 * @param id {number}
 */
app.put('/api/todo', (req, res) => {
    const { id, text, completed } = req.body;
    const todo = editTodo(id, text, completed);

    res.json(
        { 
            success: true,
            data: {
                todo: todo
            }
        }
    );
});

/* deletes a todo item
 * @param id {number}
 */
app.delete('/api/todo', (req, res) => {
    const { id } = req.body;
    deleteTodo(id);

    res.json(
        { 
            success: true,
            data: {}
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
