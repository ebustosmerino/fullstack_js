'use strict';

var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/products', (req, res) => {
    res.send('Listado de productos');
});

app.get('/products/:id', (req, res) => {
    res.send('Obtener producto especifico');
});

app.get('/products/:id/entregar', (req, res) => {
    res.send('Marcar como entregado un producto especifico');
});

app.post('/products', (req, res) => {
    res.send('Creacion de producto');
});

module.exports = app;