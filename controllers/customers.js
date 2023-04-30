const CustomerModel = require('../models/customers');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminModel = require('../models/admins');
const ClothesModel = require('../models/clothes');

const customerSignUp = async (req, res) => {
    const incomingData = req.body;
    
    // Encrypting Password
    const encryptedPassword = await bcrypt.hash(incomingData.password, 10);

    try {
        const isCustomerExist = await CustomerModel.findOne({email: incomingData.email});

        if (!isCustomerExist) {
            const newCustomer = new CustomerModel({
                name: incomingData.name,
                email: incomingData.email,
                password: encryptedPassword
            }) 
    
            const response = await newCustomer.save();
            return res.status(200).json({
                message: "Created Successfully",
                data: response
            })
        } else {
            return res.status(500).json({
                message: "This Email Exists",
                error: 'error'
            })
        }

    } catch(error) {
       return res.status(500).json({
            error,
            message: 'There was an error'
       }) 
    }
}

const customerLogin = async (req, res) => {
    const incomingCredentials = req.body;
    let foundCustomer = await CustomerModel.findOne({email: incomingCredentials.email});

    if(foundCustomer) {
        const matchingPassword = await bcrypt.compare(incomingCredentials.password, foundCustomer.password);
        
        if(matchingPassword) {

            // let the user login
            const accessToken = jwt.sign({
                email: foundCustomer.email,
                password: foundCustomer.password
            }, process.env.SECRETKEY)

            return res.status(200).json({
                data: foundCustomer,
                message: "Login Successfully",
                token: accessToken
            })
        } else {
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }
    } else {
        return res.status(404).json({
            message: "User Doesn't Exist"
        })
    }
}

// Each Customer can only be allowed to update their information
const updateCustomer = async (req, res) => {
    const id = req.params.id;
    const incomingData = req.body;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundCustomer = await CustomerModel.findOne({email: decodeToken.email});
            
            if(foundCustomer) {
                const response = await CustomerModel.findByIdAndUpdate(id, incomingData, {returnOriginal: false});
                return res.status(200).json({
                    data: response,
                    message: "Customer Updated Successfully"
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

// only admin can delete customer
const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email });
            if(foundAdmin) {
                const response = await CustomerModel.findByIdAndDelete(id);
                return res.status(200).json({
                    data: response,
                    message: "Customer Deleted Successfully"
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

// Only Admin can get all customer
const getAllCustomer = async (req, res) => {
    console.log("hi");
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;
    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        console.log(decodeToken)
        try{
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            console.log(foundAdmin);
            if(foundAdmin) {
                const response = await CustomerModel.find();

                return res.status(200).json({
                    message: "Fetched All Customers Successfully",
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

// only admin can get customer by id
const getCustomerById = async (req, res) => {
    const id = req.params.id;
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;

    if(token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);

        try {
            const foundAdmin = await AdminModel.findOne({email: decodeToken.email});
            if(foundAdmin) {
                const response = await CustomerModel.findById(id);
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

const loadDashBoard = async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    let decodeToken;
    if (token) {
        decodeToken = jwt.verify(token, process.env.SECRETKEY);
        try {
            const ifUserExist = await CustomerModel.findOne({email: decodeToken.email});
            if (ifUserExist) {
                return res.status(200).json({
                    message: "Load Dashboard",
                    data: ifUserExist
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

const showIndividualProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await ClothesModel.findById(id);
        if (response) {
            const filePath = path.join(__dirname, '..', 'public', 'html', 'individual.html');
            res.sendFile(filePath);
        } else {
            return res.send("Your Clothes Couldn't Found")
        }
    } catch(error) {
        return res.send("Your Clothes Couldn't Found")
    }

}
module.exports = {
    customerSignUp, 
    customerLogin, 
    updateCustomer, 
    deleteCustomer, 
    getAllCustomer,
    getCustomerById,
    loadDashBoard,
    showIndividualProduct
}