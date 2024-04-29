const { request, response } = require("express");
const users = require("../models/users");
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
    const newUser = users({
        _id: new mongoose.Types.ObjectId(), 
        email,
        username,
        password, 
        photo: "", 
        description: "", 
        follow: 0, 
        followers: 0, 
        is_admin: 0 
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