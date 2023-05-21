const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    topic: {
        type: String
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
    },
    sideImg1:{
        type: String
    },
    sideImg2: {
        type: String
    },
    sales: {
        type: Number
    }

}, {
    timestamps: true
})
ClothesSchema.plugin(mongoosePaginate)
const ClothesModel = mongoose.model("Clothes", ClothesSchema);
module.exports = ClothesModel;