'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/user/', UserController.getUsers);
api.get('/user/:id', UserController.getUser);
api.post('/user', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/user/:id', UserController.updateUser);

module.exports = api;