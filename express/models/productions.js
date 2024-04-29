const mongoose = require("mongoose");

const productionsSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        rating: Number,
        genre: [String],
        director: String,
        writer: String,
        cast: [String],
        release: String,
        runtime: Number,
        best_movie: Boolean,
        best_serie: Boolean,
        premier_movie: Boolean,
        new_serie: Boolean,
        type_prod: Number,
        poster: String,
        banner:String,
        classification: String
    }
)

module.exports = mongoose.model("productions", productionsSchema);