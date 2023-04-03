const router = require('express').Router();

const {
    getThought,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

router.route('/thoughts')
    .get(getThought)
    .post(createThought);

router.route('/thoughts/:thoughtId')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought);
    
module.exports = router;