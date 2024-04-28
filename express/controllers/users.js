const { request, response } = require("express");
const users = require("../models/users");
const userReg = require("../models/userReg");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

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
    const { id } = req.query;
    const objectId = ObjectId.isValid(id) ? new ObjectId(id) : null;
    users.findById(objectId).then(
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

const authenticateUser = (req = request, res = response) => {
    const { email, password } = req.query;

    users.findOne({ email: email, password: password }).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    msg: "Usuario autenticado",
                    result
                });
            } else {
                res.status(404).json({
                    msg: "Usuario no encontrado",
                    result: null
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error de servidor",
                error
            });
        }
    );
}


const registerUser = (req = request, res = response) => {
    const { email, username, password} = req.body;
    const photo = "";
    const description = "";
    const follow = 0;
    const followers = 0;
    const is_admin = 0;
    const newUser = users({
        email,
        username,
        password,
        photo,
        description,
        follow,
        followers,
        is_admin,
    })

    newUser.save().then(
        () => {
            res.status(200).json({
                msg: "Usuario insertado",
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error de servidor"
            });
        }
    );
        
}

module.exports = {
    getProfile,
    getProfileId,
    authenticateUser,
    registerUser
}