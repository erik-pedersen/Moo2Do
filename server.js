const express = require('express');
const PORT = 3000
const app = express();
const secret = require('./secret');
const logger = require('morgan');
const path = require("path");

app.use(logger("dev"));

app.use(express.static("public"));

app.use("/secret", secret);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
