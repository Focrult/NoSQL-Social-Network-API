//Import models
const {User, Thought} = require('../models/index');

//controller
module.exports = {

    getThought(req, res){
        Thought.find()
        .populate('username')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },


    getThoughtId(req, res){
        Thought.findOne({ _id: req.params.thoughtId})
        .populate('username')
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },



    createThought(req, res) {
        Thought.create(req.body)
        .then((data) => {
            return User.findOneAndUpdate(
                {_id:req.body.username},
                {$push: {thoughts: data._id}},
                {new: true},
            )
        }).then((user) =>
        !user
        ? res.status(404).json({ message: 'error with id'})
        : res.json({message: 'Success with thought creation!'})
        )
        .catch((err) => res.status(500).json(err));
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