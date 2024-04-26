const { request, response } = require("express");
const comments = require("../models/comments");
const { ObjectId } = require('mongodb');


const getCommentsUser = (req = request, res = response) => {
    const { id } = req.query;
    comments.find({ id_user: id}).then(
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
    getCommentsUser
}