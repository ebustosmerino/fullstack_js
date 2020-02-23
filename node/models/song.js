'use strict'
// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creacion de objeto del esquema y sus atributos
var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {
        type: Schema.ObjectId,
        ref: 'Album'
    }
});

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('Song', SongSchema);