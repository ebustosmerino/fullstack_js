var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var mongoosePaginate = require('mongoose-pagination');

function getArtist(req, res) {
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!artist) {
                res.status(404).send({
                    message: 'No se encontro el artista'
                });
            } else {
                res.status(200).send({
                    artist
                });
            }
        }
    });
}

function saveArtist(req, res) {
    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el artista'
            })
        } else {
            if (!artistStored) {
                res.status(404).send({
                    message: 'El artista no fue guardado'
                })
            } else {
                res.status(200).send({
                    artist: artistStored
                })
            }
        }
    })
}

function getArtists(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!artists) {
                res.status(404).send({
                    message: 'No hay artistas'
                });
            } else {
                res.status(200).send({
                    total: total,
                    artists: artists
                });
            }
        }
    });
}

function updateArtist(req, res) {
    var artistId = req.params.id;

    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error en la petición"
            });
        } else {
            if (!artistUpdated) {
                res.status(404).send({
                    message: 'No se actualizo el artista'
                });
            } else {
                res.status(200).send({
                    artist: artistUpdated
                });
            }
        }
    });
}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición - Artist findByIdAndRemove'
            });
        } else {
            if (!artistRemoved) {
                res.status(404).send({
                    message: 'No fue eliminado el artista'
                });
            } else {
                Album.find({
                    artist: artistRemoved._id
                }).remove((err, albumRemoved) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error en la petición - Album findByIdAndRemove'
                        });
                    } else {
                        if (!albumRemoved) {
                            res.status(404).send({
                                message: 'El album no ha sido eliminado'
                            });
                        } else {
                            Song.find({
                                album: albumRemoved._id
                            }).remove((err, songRemoved) => {
                                if (err) {
                                    res.status(500).send({
                                        message: 'Error en la petición - Song findByIdAndRemove'
                                    });
                                } else {
                                    if (!songRemoved) {
                                        res.status(404).send({
                                            message: 'La canción no ha sido eliminada'
                                        });
                                    } else {
                                        res.status(200).send({
                                            artist: artistRemoved
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist
}