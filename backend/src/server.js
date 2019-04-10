const express = require('express');

const app = express();

/// Middlewares
app.use(express.json());
// Allows requests with file data
app.use(express.urlencoded({ extend: true }));

app.use(require('./routes'));

app.listen(3333);
