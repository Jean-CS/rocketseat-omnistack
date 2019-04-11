const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const path = require('path');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.get('/hello', (req, res) => {
    return res.send('Hello world');
});

routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);

// 'file' is the name of the file from the client
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
routes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    console.log('routes get *');
});

module.exports = routes;
