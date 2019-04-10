const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const user = 'rocketseat';
const pass = 'rocketseat';
const db = 'omnistack';
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0-j1aro.mongodb.net/${db}?retryWrites=true`, {
    useNewUrlParser: true,
});

/// Middlewares
app.use(express.json());
// Allows requests with file data
app.use(express.urlencoded({ extend: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

app.listen(3333);
