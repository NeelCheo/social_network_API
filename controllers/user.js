// Add a friend to a user's friend list
const addFriend = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  };
  
  // Remove a friend from a user's friend list
  const removeFriend = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  };
  
  module.exports = { addFriend, removeFriend };
  