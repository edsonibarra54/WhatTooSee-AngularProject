const{ request, response} = require("express");

const getUsers = (req = request, res = response) =>{
    res.status(200).json({
        msg: "Controller get"
    });
}

const getUsersDos = (req = request, res = response) =>{
    const params = req.query;

    res.status(200).json({
        msg: "Controller get",
        params
    });
}

const postUsers = (req = request, res = response) =>{
    const body = req.body;

    res.status(200).json({
        msg: "Controller post",
        body
    });
}

const putUsers = (req = request, res = response) =>{
    const params = req.params.id;
    res.status(200).json({
        msg: "Controller put",
        params
    });
}

const deleteUsers = (req = request, res = response) =>{
    res.status(200).json({
        msg: "Controller delete"
    });
}

module.exports = {
    getUsers, 
    postUsers, 
    putUsers,
    deleteUsers,
    getUsersDos
}