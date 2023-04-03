//Import models
const {User, Thought} = require('../models/index');

//controller
module.exports = {

    getThought(req, res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },


    getThoughtId(req, res){
        Thought.findOne({ _id: req.params.thoughtId})
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },



    createThought(req, res) {
        Thought.create(req.body)
        .then(

        )
    },



    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params. thoughtId},
            {$set: req.body},
            {},

        )
        then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thought with that ID' })
    : Application.deleteMany({ _id: { $in: thought.applications } })
        )
    },

    
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : Application.deleteMany({ _id: { $in: thought.applications } })
    )
    .then(() => res.json({ message: 'thought deleted!' }))
    .catch((err) => res.status(500).json(err));
}
}

// Get All

// Get ID

// Add new

// Update existing

// Delete by ID