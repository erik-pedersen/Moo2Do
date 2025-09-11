import express from 'express';
import { getTodos, createTodo, editTodo, deleteTodo } from './todos.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
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
    const { text } = req.body;
    createTodo(text);

    res.json(
        { 
            success: true,
            data: {}
        }
    );
});

/* edits a todo item
 * @param text {string}
 * @param id {number}
 */
app.put('/api/todo', (req, res) => {
    const { id, text } = req.body;
    editTodo(id, text);

    res.json(
        { 
            success: true,
            data: {}
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
