'use strict';

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

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
                        res.status(200).send({
                            user: user
                        });
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

module.exports = {
    getUsers,
    getUser,
    saveUser,
    loginUser,
    updateUser
}