const mongoose = require("mongoose");

const userReg = mongoose.Schema(
    {
        email: String,
        username: String,
        password: String,
        photo: String,
        description: String,
        follow: Number,
        followers: Number,
        is_admin: Number
    }
)

module.exports = mongoose.model("userReg", userReg);