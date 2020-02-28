'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var ArtistController = require('../controllers/artist');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/artists'
});

var api = express.Router();

api.get('/artist/:id', ArtistController.getArtist);
api.post('/artist', ArtistController.saveArtist);
api.get('/artist/:page?', ArtistController.getArtists);
api.put('/artist/:id', ArtistController.updateArtist);
api.delete('/artist/:id', ArtistController.deleteArtist);
api.post('/upload-image-artist/:id', md_upload, ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile);

module.exports = api;