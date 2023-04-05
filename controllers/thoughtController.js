//Import models
const {User, Thought} = require('../models/index');

//Thought and Reactions
//Use tenary functions
//Went to normal if statements to deal with my errors
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
    ).catch((err) => res.status(500).json(err));
},

    createThought({params, body}, res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true})
        })
        .then(thoughts => {
            if(!thoughts){
                res.status(404).json({message: 'No thoughts found'});
                return;
            }
            res.json(thoughts);
        }).catch(err => res.json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params. thoughtId},
            {$set: req.body},
            {runValidators: true, new: true},
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
},

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    ).then(() => res.json({ message: 'thought deleted!' })).catch((err) => res.status(500).json(err));
},

//Reactions
createReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$push: {reactions: req.body}},
        {new: true, runValidators: true}
    )
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thought => {
        if (!thought) {
            return res.status(404).json({message: 'Error with reaction'});
        }
        return res.json(thought);
    }).catch(err => res.status(500).json(err));
},

// Reactions
deleteReaction({ params }, res) {
    const { thoughtId, reactionId } = params; 

    Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId } } }, 
      { new: true })
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v') //-__v is used for the populated reactions in our response! <- IMPORTANT NOTE
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Error with reaction' });
        }
        return res.json(thought);
      }).catch((err) => res.status(500).json(err));
  }
}