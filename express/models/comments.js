const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id_user: String,
        id_production: String,
        comment: String,
        stars: Number
    },{ versionKey: false }
)

module.exports = mongoose.model("comments", commentsSchema);