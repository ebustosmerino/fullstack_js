'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var SongController = require('../controllers/song');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/songs'
});

var api = express.Router();

api.get('/song/:id', SongController.getSong);
api.get('/songs/:album?', SongController.getSongs);
api.post('/song/', SongController.saveSong);
api.put('/song/:id', SongController.updateSong);
api.delete('/song/:id', SongController.deleteSong);
api.post('/upload-file-song/:id', md_upload, SongController.uploadFile);
api.get('/get-song-file/:songFile', SongController.getSongFile);

module.exports = api;