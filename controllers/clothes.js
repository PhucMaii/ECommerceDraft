const ClothesModel = require('../models/clothes');
const AdminModel = require('../models/admins');
const CustomerModel = require('../models/customers')

const jwt = require('jsonwebtoken');

const createClothes = async (req, res) => {
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const newClothes = new ClothesModel(incomingData);
                const response = await newClothes.save();

                return res.status(200).json({
                    message: "New Clothes Created Successfully",
                    DataView: response
                })
            } else {
                return res.status(401).json({
                    message: "Admin Doesn't Exist"
                })
            }
        } catch(error) {

        }
    } else {
        return res.status(500).json({
            message: "You need to provide access token"
        })
    }
}

const updateClothes = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            
            if(foundAdmin) {
                const response = await ClothesModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});
                return res.status(200).json({
                    data: response,
                    message: "Clothes Updated Successfully"
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

const deleteClothes = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email });
            if(foundAdmin) {
                const response = await ClothesModel.findByIdAndDelete(id);
                return res.status(200).json({
                    data: response,
                    message: "Clothes Deleted Successfully"
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
    } else {
        return res.status(500).json({
            message: "You need to provide access token"
        })
    }
}

const getAllClothes = async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try{
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await ClothesModel.find();

                return res.status(200).json({
                    message: "Fetched All Clothes Successfully",
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

const getClothesById = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await ClothesModel.findById(id);
                return res.status(200).json({
                    message: `Fetched Clothes ${response.name} Successfully`,
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

const orderClothes = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const foundCustomer = await CustomerModel.findOne({email: decodeToken.email});
            if(foundCustomer) {
                const response = await ClothesModel.findById(id);
                response.quantity--;
                await response.save();
                return res.status(200).json({
                    message: `Order ${response.name} Succesfully`,
                    customer: foundCustomer.name,
                    data: response
                })                
            } else {
                return res.status(401).json({
                    message: "Customer Doesn't Exist"
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

module.exports = {
    createClothes,
    updateClothes,
    deleteClothes,
    orderClothes,
    getAllClothes,
    getClothesById
}