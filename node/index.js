'use strict'

// Carga el módulo de mongoose para la conexión con MongoDB
var mongoose = require('mongoose');

// Carga el fichero app.js con la configuración de Express
var app = require('./app');

// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var port = 3800;

// Mongoose con conexión por Promesas
mongoose.Promise = global.Promise;

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/mongo_db0', {
        useMongoClient: true
    })
    .then(() => {
        console.log("La conexión a la base de datos se ha realizado correctamente")

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(port, () => {
            console.log("servidor corriendo en http://localhost:" + port);
        });
    })
    .catch(err => console.log(err));