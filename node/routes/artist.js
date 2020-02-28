'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var ArtistController = require('../controllers/artist');

var api = express.Router();

api.get('/artist/:id', ArtistController.getArtist);
api.post('/artist', ArtistController.saveArtist);
api.get('/artist/:page?', ArtistController.getArtists);
api.put('/artist/:id', ArtistController.updateArtist);
api.delete('/artist/:id', ArtistController.deleteArtist);

module.exports = api;