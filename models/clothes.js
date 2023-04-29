const mongoose = require('mongoose');

const ClothesSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: {type: String},
        fabric: {type: String},
        style: {type: String}
    },
    color: {
        type: [String],
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number
    },
    isNewArrival: {
        type: Boolean
    },
    isBestSeller: {
        type: Boolean
    },
    img: {
        type: String
    }

}, {
    timestamps: true
})

const ClothesModel = mongoose.model("Clothes", ClothesSchema);
module.exports = ClothesModel;