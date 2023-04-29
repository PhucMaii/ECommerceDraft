const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admins')

// router.use(express.static('public'));
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