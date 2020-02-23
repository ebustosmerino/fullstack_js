'use strict';

var express = require('express');

var app = express();

//Importar rutas
var user_routes = require('./routes/user');

//Cargar rutas
app.use('/api', user_routes);

module.exports = app;