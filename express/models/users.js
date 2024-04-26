const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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

module.exports = mongoose.model("users", userSchema);