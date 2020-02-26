'use strict'

var jwt = require('jwt-simple');
var secret = 'ozV3@WGi';

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image
    };

    return jwt.encode(payload, secret);
};