const { User, Thought } = require('../models');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find({}).populate({
      path: 'thoughts',
      select: '-__v',
    }).select('-__v');
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get one user by id
const getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id }).populate({
      path: 'thoughts',
      select: '-__v',
    }).select('-__v');
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create user
const createUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.id });
    if (!userData) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete thoughts by user
const deleteThoughtsByUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts }});
    res.json({ message: 'User and associated thoughts deleted.' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// add friend
const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove friend
const removeFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

  
  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteThoughtsByUser,
    addFriend,
    removeFriend
  };
  