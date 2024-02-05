const express = require('express');
const router = express.Router({mergeParams:true});
const Product = require('../models/product');
const productController = require('../controllers/productController');
const {isLoggedIn} = require('../middleware/authMiddleware');

router.get('/search',isLoggedIn,productController.search);


router.route('/')
    .get(productController.index)
    .post(isLoggedIn,productController.create)

router.route('/:id')
    .get(isLoggedIn,productController.show)
    .put(isLoggedIn,productController.update)
    .delete(isLoggedIn,productController.delete)




module.exports = router;