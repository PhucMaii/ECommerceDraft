const mongoose = require('mongoose');
const CouponSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    amountOfDiscount: {
        type: Number,
        required: true
    }
})

const CouponModel = mongoose.model('Coupon', CouponSchema);
module.exports = CouponModel;