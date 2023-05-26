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

router.get('/dashboard/newTopic', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'customer', 'newTopic.html');
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


router.get('/cart/purchaseMethod/purchaseSuccessfully', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'thankYouPage.html');
    res.sendFile(filePath);
})


router.get('/cart/purchaseOneItem', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html','customer', 'orderOneItem.html');
    res.sendFile(filePath);
})

const apiKey = 'N8SqkmVfWSlR5XhR7tl7MkN2YWBXwCF0';

// Compress image using TinyPNG API
const compressImage = async (imageUrl) => {
  const response = await fetch('https://api.tinify.com/shrink', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: {
        url: imageUrl,
      },
    }),
  });

  const compressedData = await response.json();

  if (response.ok) {
    return compressedData.output.url;
  } else {
    throw new Error('Image compression failed');
  }
};

app.get('/compress', async (req, res) => {
    const imageUrl = req.query.url;
  
    try {
      const compressedImageUrl = await compressImage(imageUrl);
      res.json({ compressedImageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image compression failed' });
    }
  });

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
router.put('/order/:id', CustomerController.orderClothes);

// Order 1 item
router.put('/order/oneItem/:id', CustomerController.orderOneItem);

// Edit Cart
router.put('/cart/editItem/:id', CustomerController.customerEditCart);


module.exports = router;