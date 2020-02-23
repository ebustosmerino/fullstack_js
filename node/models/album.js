'use strict'
// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creacion de objeto del esquema y sus atributos
var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {
        type: Schema.ObjectId,
        ref: 'Artist'
    }
});

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('Album', AlbumSchema);