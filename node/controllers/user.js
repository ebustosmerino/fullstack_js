'use strict';

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send({
                message: 'Error en getUsers'
            });
        } else {
            if (!users) {
                res.status(404).send({
                    message: 'No hay listado'
                });
            } else {
                res.status(200).send({
                    users: users
                });
            }
        }
    })
}

function getUser(req, res) {
    var userId = req.params.id;

    User.findOne({
        _id: userId
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en getUser'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                res.status(200).send({
                    user: user
                });
            }
        }
    });

}

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Introduce todos los campos'
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Introduce password'
        });
    }
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en loginUser'
            });
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user: user
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido logearse'
                        });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var params = req.body;

    User.findByIdAndUpdate(userId, params, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en updateUser'
            });
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });
}

function uploadImage(req, res) {
    var userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        //var file_split = file_path.split('\\');
        var file_split = file_path.split('/'); /* MacOS */
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, {
                image: file_name
            }, (err, userUpdated) => {
                if (!userUpdated) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar la imagen del usuario'
                    });
                } else {
                    res.status(200).send({
                        message: 'Fichero subido ' + file_name
                    });
                }
            });
        } else {
            res.status(404).send({
                message: 'Solo se permiten archivos de imagenes'
            });
        }
    } else {
        res.status(404).send({
            message: 'No has subido ningun fichero'
        });
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(404).send({
                message: 'No existe la imagen.'
            });
        }
    })
}

module.exports = {
    getUsers,
    getUser,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}