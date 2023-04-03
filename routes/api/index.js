const router = require('express').Router();


const userRoutes = require('userRoutes.js');
const thoughtRoutes = require('thoughtRoutes.js');

router.use('/api/user', userRoutes);
router.use('/api/thought', thoughtRoutes);

module.exports = router;