const express = require('express');
const path = require('path');
const router = express.Router();
const CustomerController = require('../controllers/customers')
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Increase the limit of event listeners to 20
emitter.setMaxListeners(20);

// Add event listeners
for (let i = 0; i < 15; i++) {
  emitter.on('event', () => console.log(`Listener ${i + 1}`));
}

// Trigger the event
emitter.emit('event');

router.use(express.static(path.join(__dirname, "../public")));
// API for customers
// HomePage
router.get('/dashboard', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer', 'homePage.html');
    res.sendFile(filePath);
});

// Get signup and login Page
router.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer','signup.html');
    res.sendFile(filePath);
})

// Get to show individual product
router.get('/individualProduct/:id', CustomerController.showIndividualProduct);

// Show Cart Page
router.get('/cart', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer','cart.html');
    res.sendFile(filePath);
})

// Show All Clothes
router.get('/allClothes', (req, res) => {
    const filePath = path.join(__dirname, '..','public', 'html','customer', 'shop.html');
    res.sendFile(filePath);
})

// Show clothes from search bar
router.get('/search', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'search.html');
    res.sendFile(filePath);
})

// Shop type
router.get('/shirt', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'shopType.html');
    res.sendFile(filePath);
})

router.get('/t-shirt', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'shopType.html');
    res.sendFile(filePath);
})

router.get('/pants', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer','shopType.html');
    res.sendFile(filePath);
})


router.get('/sweater', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'shopType.html');
    res.sendFile(filePath);
})

router.get('/hoodie', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer','shopType.html');
    res.sendFile(filePath);
})

router.get('/jacket', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'shopType.html');
    res.sendFile(filePath);
})

router.get('/cart/purchaseMethod', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'order.html');
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

// Order Clothes
router.put('/order/:id', CustomerController.orderClothes)

// Edit Cart
router.put('/cart/editItem/:id', CustomerController.customerEditCart);


module.exports = router;