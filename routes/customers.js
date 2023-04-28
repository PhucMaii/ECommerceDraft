const express = require('express');
const router = express.Router();
const CustomerController = reuqire('../controller/customers')

// API for customers

// HomePage
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/homePage.html');
})

// Customer Sign Up
router.post('/signup', CustomerController.customerSignUp);

// Get a customer by an ID
router.get('/:id', CustomerController.getCustomerById);

// Customer login
router.post('/login', CustomerController.customerLogin);

// Delete Customer
router.delete('/:id', CustomerController.deleteCustomer);

// Update Customer
router.put('/:id', CustomerController.updateCustomer);

// Get all Customer
router.get('/allCustomer', CustomerController.getAllCustomer);

module.exports = router;