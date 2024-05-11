const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const User = require("../models/users");

const validateJWT = (req = request, res = response, next) => {
    const token = req.header("Authorization");

    if (!token) {
        res.status(404).json({
            msg: "Token valido:"
        })
        return;
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        User.findOne({ email: id }).then(
            (result) => {
                if (result) {
                    console.log(id)
                    req.userActive = result;
                    next();
                } else {
                    res.status(401).json({
                        msg: "Invalid token from find user"
                    })
                    return;
                }
            }
        ).catch((error) => {
            res.status(500).json({
                msg: "Error en el servidor"
            })
            return;
        });
    } catch (error) {
        res.status(401).json({
            msg: "Invalid token from try"
        })
        return;
    }

}

module.exports = {
    validateJWT
}