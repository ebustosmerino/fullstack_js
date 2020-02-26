'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/user/', UserController.getUsers);
api.get('/user/:id', UserController.getUser);
api.post('/user', md_auth.ensureAuth, UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;