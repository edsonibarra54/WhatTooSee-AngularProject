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
        is_admin: 0,
        following: []
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

const updateFollowing = (req = request, res = response) => {
    const { id } = req.params;
    const { following } = req.body;

    if (!following || !id) {
        res.status(400).json({
            msg: "Faltan datos"
        });
        return;
    }

    users.updateOne({ _id: id }, { following: following }).then(() => {
        const newFollowingCount = following.length;

        users.updateOne({ _id: id }, { follow: newFollowingCount }).then(() => {
            res.status(200).json({
                msg: "Elemento actualizado con éxito"
            });
        }).catch(() => {
            res.status(500).json({
                msg: "Error al actualizar el campo 'follow'"
            });
        });
    }).catch(() => {
        res.status(500).json({
            msg: "Error al actualizar el elemento"
        });
    });
};

const updateFollowersCount = async (req, res) => {
    const userId = req.params.id;
    const increment = parseInt(req.params.increment);

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: 'ID de usuario inválido' });
        }

        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        user.followers += increment;
        await user.save();
        res.status(200).json({ msg: 'Contador de seguidores actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el contador de seguidores:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const updateProfile = (req = request, res = response) => {
    const { id } = req.params;
    const { username, description, photo } = req.body;

    if (!id || !username || !description || !photo) {
        console.log(id + username + description + photo);
        return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    users.updateOne({ _id: id }, { username, description, photo })
        .then(() => {
            res.status(200).json({ msg: "Perfil actualizado con éxito" });
        })
        .catch(() => {
            res.status(500).json({ msg: "Error al actualizar el perfil" });
        });
};
module.exports = {
    getProfile,
    getProfileId,
    authenticateUser,
    registerUser,
    updateFollowing,
    updateFollowersCount,
    updateProfile
}