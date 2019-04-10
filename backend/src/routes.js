const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post('/boxes', BoxController.store);
// 'file' is the name of the file from the client
routes.post('/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
