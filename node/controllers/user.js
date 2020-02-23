'use strict';

function test(req, res) {
    res.status(200).send({
        message: 'Accion del controlador de usuarios'
    });
}

module.exports = {
    test
}