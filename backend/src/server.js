const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Everytime the user opens a connection we will get a socket
io.on('connection', socket => {
    // When we get a connection named 'connectRoom', we join it to box room
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

const user = 'rocketseat';
const pass = 'rocketseat';
const db = 'omnistack';
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0-j1aro.mongodb.net/${db}?retryWrites=true`, {
    useNewUrlParser: true,
});

// Enable a global variable 'io' inside req
app.use((req, res, next) => {
    req.io = io;

    return next();
});

/// Middlewares
app.use(express.json());
// Allows requests with file data
app.use(express.urlencoded({ extend: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
