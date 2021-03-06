'use strict'
// Cargamos el módulo de mongoose
var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({
    uploadDir: './uploads/users'
});

var api = express.Router();

api.get('/user/', UserController.getUsers);
api.get('/user/:id', UserController.getUser);
api.post('/user', md_auth.ensureAuth, UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;