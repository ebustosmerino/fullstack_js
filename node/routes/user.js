'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/user', UserController.saveUser);

module.exports = api;