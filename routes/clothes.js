const express = require('express');
const router = express.Router();
const ClothesController = reuqire('../controller/clothes')

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

module.exports = router;