const { request, response } = require("express");
const comments = require("../models/comments");
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");


const getCommentsUser = (req = request, res = response) => {
    const { id } = req.query;
    comments.find({ id_user: id}).then(
        (result) => {
            res.status(200).json({
                msg: "comment ola",
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

const getCommentsProduction = (req = request, res = response) => {
    const { id } = req.query;
    comments.find({ id_production: id}).then(
        (result) => {
            res.status(200).json({
                msg: "comment ola",
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

const createComment = (req = request, res = response) => {
    const { id_user, id_production, comment, stars } = req.body;

    if(!id_user || !id_production || !comment || !stars){
        res.status(400).json({
            msg: "Faltan datos"
        })
        return;
    }

    const newComment = comments({
        _id: new mongoose.Types.ObjectId(), 
        id_user, 
        id_production, 
        comment, 
        stars
    })

    newComment.save().then(()=>{
        res.status(200).json({
            msg:"Comentario insertado con exito"
        });
    }).catch(()=>{
        res.status(500).json({
            msg:"Error al insertar el comentario"
        });
    })
}

const deleteComments = (req = request, res = response) => {
    const { id_production } = req.body;

    console.log(id_production);

    comments.deleteMany({ id_production: id_production }).then((result) => {
        res.status(200).json({
            msg: "Comments deleted successfully"
        });
    }).catch(() => {
        res.status(500).json({
            msg: "Error deleting comments"
        });
    });
}

module.exports = {
    getCommentsUser,
    getCommentsProduction,
    createComment,
    deleteComments
}