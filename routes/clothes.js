const express = require('express');
const path = require('path');
const router = express.Router();
const ClothesController = require('../controllers/clothes')


router.use(express.static(path.join(__dirname, "../public")));

// API for clothes

// Add Clothes
router.post('/', ClothesController.createClothes);

// Get clothes by id
router.get('/:id', ClothesController.getClothesById);

// Delete Clothes
router.delete('/:id', ClothesController.deleteClothes);

// Update Clothes
router.put('/:id', ClothesController.updateClothes);

// Get all Clothes
router.get('/', ClothesController.getAllClothes);

// Order Clothes
router.put('/order/:id', ClothesController.orderClothes);

// Get Clothes By Type
router.get('/type/:type', ClothesController.getClothesByType);



module.exports = router;