const User = require('../models/User');

// User + Friends
//Use tenary functions
//Went to normal if statements to deal with my errors
module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => {
        console.log(users);
        res.json(users);
      }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })},

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createUser(req, res) {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Username already exists' });
        } else {
          User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
        }
      }).catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
      User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        { runValidators: true, new: true})
        .then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
  )},

  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId })
        .then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      ).then(() => res.json({ message: 'User deleted!' })).catch((err) => res.status(500).json(err));
  },

  addFriends(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      {$addToSet: {friends: req.params.friendId}},
      {new: true}
    ).then((updatedUser) => res.json(updatedUser)).catch((err) => res.status(500).json(err));
  },

  deleteFriends(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull:{ friends:req.params.friendId} },
      {new: true}
    ).then((updatedUser) => res.json(updatedUser)).catch((err) => res.status(500).json(err))},
  };