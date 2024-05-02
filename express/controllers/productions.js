const { request, response } = require("express");
const productions = require("../models/productions");
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

    console.log(query);

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

module.exports = {
    getProductions,
    getProduction,
    getProductionById,
    getProductionsByType
}