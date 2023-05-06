const CouponModel = require('../models/coupon');
const AdminModel = require('../models/admins');
const jwt = require('jsonwebtoken');


const createCoupon = async (req, res) => {
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            
            if(foundAdmin) {
                const newCoupon = new CouponModel(incomingData);
                const response = await newCoupon.save();

                return res.status(200).json({
                    message: "Coupon Added Succesfully",
                    data: response
                })
            } else {
                return res.status(401).json({
                    message: "Admin Doesn't Exist"
                })
            }
        } catch(error) {
            return res.status(500).json({
                message: "There was an error",
                error
            })
        }
    } else{
        return res.status(500).json({
            message:"You need to provide access token"
        })
    }
}

const getAllCoupon = async (req, res) => {
    try {
        const response = await CouponModel.find();
        return res.status(200).json({
            message: "Fetched All Coupon Successfully",
            data: response
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getCouponById = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;
    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try{
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await CouponModel.findById(id);

                return res.status(200).json({
                    message: "Fetched Coupon By Id Successfully",
                    data: response
                })
            } else{
                return res.status(401).json({
                    message: "Admin Doesn't Exist"
                })
            }

        } catch(error) {
            return res.status(500).json({
                message: "There was an error",
                error
            })
        }

    } else {
        return res.status(500).json({
            message: "You need to provide access token"
        })
    }
}

const deleteCoupon = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;
    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try{
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await CouponModel.findByIdAndDelete(id);

                return res.status(200).json({
                    message: "Delete Coupons Successfully",
                    data: response
                })
            } else{
                return res.status(401).json({
                    message: "Admin Doesn't Exist"
                })
            }

        } catch(error) {
            return res.status(500).json({
                message: "There was an error",
                error
            })
        }

    } else {
        return res.status(500).json({
            message: "You need to provide access token"
        })
    }
}

const updateCoupon = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundCustomer = await AdminModel.findOne({email: decodeToken.email});
            
            if(foundCustomer) {
                const response = await CouponModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});
                return res.status(200).json({
                    data: response,
                    message: "Coupon Updated Successfully"
                })
            } else {
                return res.status(401).json({
                    message: "You are not authorized"
                })
            }
        } catch(error) {
            return res.status(500).json({
                error,
                message: "There was an error"
           }) 
        }
    } else{
        return res.status(500).json({
            message: "You need to provide access token"
        })
    }
}

module.exports = {
    createCoupon,
    getAllCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon
}