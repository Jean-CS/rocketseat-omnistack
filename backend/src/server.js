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
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
