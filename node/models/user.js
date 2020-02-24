'use strict'
// Cargamos el módulo de mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creacion de objeto del esquema y sus atributos
var UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    image: String
});

// Exportar el modelo para usarlo en otros archivos
module.exports = mongoose.model('User', UserSchema);