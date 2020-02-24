'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Importar rutas
var user_routes = require('./routes/user');

//Cargar rutas
app.use('/api', user_routes);

module.exports = app;