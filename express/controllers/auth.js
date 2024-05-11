const { request, response } = require("express");
const User = require("../models/users.js");
const { generateJWT } = require("../helpers/jwt.js");

const login = (req = request, res = response) => {
    const { email, password } = req.body;
    console.log(req.body);

    if(!email || !password){
        res.status(400).json({
            msg:"Datos invalidos"
        });
        return;
    }

    User.findOne({ email: email, password: password }).then(
        (result) => {
            if (result) {
                generateJWT(email).then((token) => {
                    res.status(200).json({
                        msg:"Login OK",
                        token: token,
                        result: result
                    });
                }).catch((error) => {
                    res.status(500).json({
                        msg: error
                    });
                })
            } else {
                res.status(401).json({
                    msg:"Datos incorrectos"
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg:"Error al obtener los datos",
            });
        }
    );
};

module.exports = {
    login
};