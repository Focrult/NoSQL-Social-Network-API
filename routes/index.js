const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// router.use((req, res) => {
//   return res.send('Wrong route!');
// });
// router.get('/', (req, res) => {
//   console.log('API is running!');
//   res.json({ message: 'Welcome to my API!' });
// });
module.exports = router;
