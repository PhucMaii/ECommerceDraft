const express = require('express');
const router = express.Router();
const path = require('path');
const AdminController = require('../controllers/admins')

router.use(express.static(path.join(__dirname, "../public")));
// HomePage
router.get('/dashboard', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'admin' , 'dashboard.html');
    res.sendFile(filePath);
});

// Get signup page
router.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'admin' ,  'adminSignup.html');
    res.sendFile(filePath);
})

// Get login page
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'html', 'admin', 'adminLogin.html');
    res.sendFile(filePath);
})

// API for admins
// admin Sign Up
router.post('/', AdminController.adminSignUp);

// Get a admin by an ID
router.get('/:id', AdminController.getAdminById);

// admin login
router.post('/login', AdminController.adminLogin);

// Delete admin
router.delete('/:id', AdminController.deleteAdmin);

// Update admin
router.put('/:id', AdminController.updateAdmin);

// Get all admin
router.get('/', AdminController.getAllAdmin);

module.exports = router;