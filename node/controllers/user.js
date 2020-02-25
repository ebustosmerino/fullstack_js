'use strict';

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

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

module.exports = {
    saveUser,
    loginUser
}