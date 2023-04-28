const AdminModel = require('../models/admins');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSignUp = async (req, res) => {
    const incomingData = req.body;
    
    // Encrypting Password
    const encryptedPassword = await bcrypt.hash(incomingData.password, 10);

    try {
        const newAdmin = new AdminModel({
            name: incomingData.name,
            email: incomingData.email,
            password: encryptedPassword
        }) 

        const response = await newAdmin.save();
        return res.status(201).json({
            data: response,
            message: "Admin Created Successfully"
        })

    } catch(error) {
       return res.status(500).json({
            error,
            message: 'There was an error'
       }) 
    }
}

const adminLogin = async (req, res) => {
    const incomingCredentials = req.body;
    const foundAdmin = await AdminModel.findOne({email: incomingCredentials.email});

    if(foundAdmin) {
        const matchingPassword = bcrypt.compare(incomingCredentials.password, foundAdmin.password)
        
        if(matchingPassword) {
            const accessToken = jwt.sign({
                email: incomingCredentials.email,
                password: incomingCredentials.password
            }, process.env.SECRETKEY);

            return res.status(200).json({
                message: "Admin Login Successfully",
                token: accessToken,
                data: foundAdmin
            })
        } else {
            return res.status(401).json({
                message: "Password Doesn't Match"
            })
        }
    } else {
        return res.status(404).json({
            message: "Admin Doesn't Exist"
        })
    }
}

const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await AdminModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});

                return res.status(200).json({
                    message: `Updated Admin ${foundAdmin.name} Successfully`,
                    data: response
                })
            } else {
                return res.status(401).json({
                    message: "Admin Doesn't Exist",
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

const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await AdminModel.findByIdAndDelete(id);

                return res.status(200).json({
                    message: `Deleted Admin ${foundAdmin.name} Successfully`,
                    data: response
                })
            } else {
                return res.status(401).json({
                    message: "Admin Doesn't Exist",
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

const getAllAdmin = async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try{
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await AdminModel.find();

                return res.status(200).json({
                    message: "Fetched All Admins Successfully",
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

const getAdminById = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await AdminModel.findById(id);
                return res.status(200).json({
                    message: `Fetched Customer ${response.name} Successfully`,
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

module.exports = {
    adminSignUp, 
    adminLogin, 
    updateAdmin, 
    deleteAdmin, 
    getAllAdmin,
    getAdminById
}