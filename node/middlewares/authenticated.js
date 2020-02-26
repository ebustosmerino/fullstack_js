'use strict'

var jwt = require('jwt-simple');
var secret = 'ozV3@WGi';

exports.ensureAuth = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        res.status(403).send({
            message: 'La petición no tiene la cabecera de autentificación'
        });
    } else {
        //elimina comillas simples o dobles
        token = token.replace(/['"]+/g, '');
        try {
            var payload = jwt.decode(token, secret);
        } catch (ex) {
            console.log(ex);
            res.status(404).send({
                message: 'Token no válido'
            });
        }

        req.user = payload;
        next();
    }
}