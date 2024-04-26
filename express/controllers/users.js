const { request, response } = require("express");
const users = require("../models/users");

const getProfile = (req = request, res = response) => {
    const params = req.query;

    users.find().then(
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

const getProfileId = (req = request, res = response) => {
    const params = req.query;

    users.find().then(
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
    getProfile,
    getProfileId
}