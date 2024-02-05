const express = require('express');
const router = express.Router({mergeParams:true});
const variantController = require('../controllers/variantcontroller');
const {isLoggedIn} = require('../middleware/authMiddleware');


router.post('/',isLoggedIn,variantController.create);

router.put('/:varId',isLoggedIn,variantController.update);

router.delete('/:varId',isLoggedIn,variantController.delete);


module.exports = router;