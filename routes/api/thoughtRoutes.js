const router = require('express').Router();

const {
    getThought,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThought)
   

router.route('/:thoughtId')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reactions')
.post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;