'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.post('/user', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;