'use strict'
// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creacion de objeto del esquema y sus atributos
var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('Artist', ArtistSchema);