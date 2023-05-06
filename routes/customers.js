const express = require('express');
const path = require('path');
const router = express.Router();
const CustomerController = require('../controllers/customers')


router.use(express.static(path.join(__dirname, "../public")));
// API for customers
// HomePage
router.get('/dashboard', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'homePage.html');
    res.sendFile(filePath);
});

// Get signup and login Page
router.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'signup.html');
    res.sendFile(filePath);
})

// Get to show individual product
router.get('/individualProduct/:id', CustomerController.showIndividualProduct);

// Show Cart Page
router.get('/cart', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'cart.html');
    res.sendFile(filePath);
})

router.put('/cart/deleteItem/:id', CustomerController.customerDeleteItemInCart)

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
router.get('/', CustomerController.getAllCustomer);

// Add Clothes to Cart
router.put('/addToCart/:id', CustomerController.addToCart)

module.exports = router;