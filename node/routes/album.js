'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var AlbumController = require('../controllers/album');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/albums'
});

var api = express.Router();

api.get('/album/:id', AlbumController.getAlbum);
api.get('/album/:artist?', AlbumController.getAlbums);
api.post('/album', AlbumController.saveAlbum);
api.post('/album/:id', AlbumController.updateAlbum);
api.delete('/album/:id', AlbumController.deleteAlbum);
api.post('/upload-image-album/:id', md_upload, AlbumController.uploadFile);
api.get('/get-image-album/:imageFile', AlbumController.getImageFile);

module.exports = api;