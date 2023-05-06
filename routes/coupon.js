const express = require('express');
const path = require('path');
const router = express.Router();
const CouponController = require('../controllers/coupon')


router.use(express.static(path.join(__dirname, "../public")));

// API for coupon

// Add Clothes
router.post('/', CouponController.createCoupon);

// Get clothes by id
router.get('/:id', CouponController.getCouponById);

// Delete Clothes
router.delete('/:id', CouponController.deleteCoupon);

// Update Clothes
router.put('/:id', CouponController.updateCoupon);

// Get all Clothes
router.get('/', CouponController.getAllCoupon);

module.exports = router;