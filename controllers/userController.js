const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

updateUser(req, res) {
User.findOneAndUpdate(
  {_id: req.params.userId},
  {$set: req.body},
  { runValidators: true, new: true},
)
.then((user) =>
!user
  ? res.status(404).json({ message: 'No user with that ID' })
  : Application.deleteMany({ _id: { $in: user.applications } })
)
},

deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : Application.deleteMany({ _id: { $in: user.applications } })
    )
    .then(() => res.json({ message: 'User deleted!' }))
    .catch((err) => res.status(500).json(err));
},

};



//Import models


//controller



// Get All

// Get ID

// Add new

// Update existing

// Delete by ID

