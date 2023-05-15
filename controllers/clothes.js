const ClothesModel = require('../models/clothes');
const AdminModel = require('../models/admins');

const jwt = require('jsonwebtoken');
const paginate = require('paginate');

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
    const {page, limit, sorted} = req.query;
    try{  
        const sortOptions = {};

        // Handle sorting by price ascending
        if(sorted === "Price: Lowest") {
            sortOptions.price = 1;
        }

        // Handle sorting by price descending
        if(sorted === "Price: Highest") {
            sortOptions.price = -1;
        }

        // Handle sorting by Name ascending
        if(sorted === "Name: A-Z") {
            sortOptions.name = 1;
        }

        // Handle sorting by Name descending
        if(sorted === "Name: Z-A") {
            sortOptions.name = -1;
        }
        
        // Handle sorting by time: Oldest or they don't choose anything
        if(sorted === "Oldest" || sorted === "All Products") {
            sortOptions.createdAt = 1;
        }

         // Handle sorting by time: Newest
        if(sorted === "Newest") {
            sortOptions.createdAt = -1;
        }


        if(page && limit && sorted) {
            const paginateResponse = await ClothesModel.paginate({}, {page, limit, sort: sortOptions});
            return res.status(200).json({
                message: "Fetched All Clothes Successfully",
                data: paginateResponse
            })
        } else {
            const response = await ClothesModel.find();
            return res.status(200).json({
                message: "Fethed All Clothes Succesfully",
                data: response
            })
        }

    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const getClothesById = async (req, res) => {
    const id = req.params.id;
    try{
        const response = await ClothesModel.findById(id);
        res.status(200).json({
            message:"Fetched Clothes By ID Successfully",
            data: response
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}



const getClothesByType = async (req, res) => {
    const type = req.params.type;
    const {page, limit, sorted} = req.query;
    try{  
        const sortOptions = {};

        // Handle sorting by price ascending
        if(sorted === "Price: Lowest") {
            sortOptions.price = 1;
        }

        // Handle sorting by price descending
        if(sorted === "Price: Highest") {
            sortOptions.price = -1;
        }

        // Handle sorting by Name ascending
        if(sorted === "Name: A-Z") {
            sortOptions.name = 1;
        }

        // Handle sorting by Name descending
        if(sorted === "Name: Z-A") {
            sortOptions.name = -1;
        }
        
        // Handle sorting by time: Oldest or they don't choose anything
        if(sorted === "Oldest" || sorted === "All Products") {
            sortOptions.createdAt = 1;
        }

         // Handle sorting by time: Newest
        if(sorted === "Newest") {
            sortOptions.createdAt = -1;
        }


        if(page && limit && sorted) {
            const paginateResponse = await ClothesModel.paginate({"description.type": type}, {page, limit, sort: sortOptions});
            return res.status(200).json({
                message: "Fetched All Clothes Successfully",
                data: paginateResponse
            })
        } else {
            const response = await ClothesModel.find({"description.type": type});
            return res.status(200).json({
                message: "Fethed Clothes By Type Succesfully",
                data: response
            })
        }

    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

const orderClothes = async (req, res) => {
    const id = req.params.id;
    try{    
        
        const response = await ClothesModel.findById(id);
        if(!response.sales) {
            response.sales = 1;
        } else {
            response.sales++;
        }
        response.quantity--;
        await response.save();
        return res.status(200).json({
            message: "Order Successfully",
            data: response
        })
    } catch(error) {
        return res.status(500).json({
            message: "There was an error",
            error
        })
    }
}

module.exports = {
    createClothes,
    updateClothes,
    deleteClothes,
    getAllClothes,
    getClothesById,
    getClothesByType,
    orderClothes
}