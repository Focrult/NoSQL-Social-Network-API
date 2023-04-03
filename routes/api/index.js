const router = require('express').Router();


const userRoutes = require('userRoutes.js');
const thoughtRoutes = require('thoughtRoutes.js');

router.use('', userRoutes);

router.use('', thoughtRoutes);




module.exports = router;