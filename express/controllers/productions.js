const { request, response } = require("express");
const productions = require("../models/productions");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const getProductions = (req = request, res = response) => {
    const params = req.query;

    productions.find().then(
        (result) => {
            res.status(200).json({
                msg: "productions ola",
                result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error",
                result: []
            });
        }
    );
}

const getProduction = (req = request, res = response) => {
    const { id } = req.query;
    const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;
    productions.findById(objectId).then(
        (result) => {
            res.status(200).json({
                msg: "profile ola",
                result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error",
                result: []
            });
        }
    );
}

const getProductionById = (req = request, res = response) => {
    const { id } = req.query;
    const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;
    productions.findById(objectId).then(
        (result) => {
            res.status(200).json({
                msg: "production ola",
                result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error",
                result: []
            });
        }
    );
}

const getProductionsByType = (req = request, res = response) => {
    const { type, genre } = req.query;
    let query = {};

    query.type_prod = type;

    if (genre) {
        query.genre = genre;
    }

    productions.find(query)
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    msg: "Productions found",
                    result
                });
                console.log(result);
            } else {
                res.status(200).json({
                    msg: "No productions found for the specified type",
                    result: []
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                msg: "Error",
                result: []
            });
        });
};

const createProduction = (req = request, res = response) => {
    const { name, rating, genre, director, writer, cast, release, runtime, best_movie, best_serie, premier_movie, new_serie, type_prod, poster, hasBanner, banner, classification } = req.body;

    const newProduction = productions({
        _id: new mongoose.Types.ObjectId(), 
        name,
        rating,
        genre,
        director,
        writer,
        cast,
        release,
        runtime,
        best_movie,
        best_serie,
        premier_movie,
        new_serie,
        type_prod,
        poster,
        banner,
        classification,
        hasBanner
    })

    if(!name || !rating || !genre || !director || !writer || !cast || !release || !runtime || !type_prod || !poster || !classification || !hasBanner){
        console.log("Faltan datos");
        res.status(400).json({
            msg: "Faltan datos"
        })
        return;
    }

    newProduction.save().then(() => {
        res.status(200).json({
            msg: "Usuario insertado",
        });
    }).catch((error) => {
        res.status(500).json({
            msg: "Error de servidor",
            error
        });
    });
}

const deleteProduction = (req = request, res = response) => {
    const { _id } = req.body;

    const objectId = ObjectId.isValid(_id) ? new ObjectId(_id) : null;
    
    productions.deleteOne({ _id: objectId }).then((result) => {
        if (result.deletedCount === 1) {
            res.status(200).json({
                msg: "Production deleted successfully"
            });
        } else {
            res.status(404).json({
                msg: "Production with the provided ID does not exist"
            });
        }
    }).catch(() => {
        res.status(500).json({
            msg: "Error deleting production"
        });
    });
}

module.exports = {
    getProductions,
    getProduction,
    getProductionById,
    getProductionsByType,
    createProduction,
    deleteProduction
}