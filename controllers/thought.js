// Add a reaction to a thought's reactions array
const addReaction = (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.body } },
    { new: true, runValidators: true }
  )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
};

// Remove a reaction from a thought's reactions array
const removeReaction = (req, res) => {
  Thought.findByIdAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
  )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
};

module.exports = { addReaction, removeReaction };
