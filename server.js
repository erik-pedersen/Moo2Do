const express = require('express');
const path = require('path');
const PORT = 3000

const app = express();

app.use(express.static(path.join(__dirname, 'website')));

app.use('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'favicon', 'favicon.ico'));
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
});
