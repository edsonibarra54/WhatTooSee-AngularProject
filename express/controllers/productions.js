const { request, response } = require("express");
const productions = require("../models/productions");
const { ObjectId } = require('mongodb');


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

module.exports = {
    getProduction
}