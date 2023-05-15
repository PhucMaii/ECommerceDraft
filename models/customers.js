const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            clothesId: {
                type:  mongoose.Schema.Types.ObjectId,
                ref: "Clothes"
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
            quantity: {
                type: Number
            }
        }
    ],
    orders: [
        {
            clothesId: {
                type:  mongoose.Schema.Types.ObjectId,
                ref: "Clothes"
            },
            color: {
                type: String
            },
            size: {
                type: String
            },
            quantity: {
                type: Number
            }
        }
    ]
}, {
    timestamps: true
})

const CustomerModel = mongoose.model('Customer', CustomerSchema);
module.exports = CustomerModel;