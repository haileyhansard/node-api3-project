const userDb = require('../users/userDb');

module.exports = function validateUserId(req, res, next) {
  // do your magic!
  const userId = Number(req.params.id);
  userDb.getById(userId)
    .then(id => {
      if (id) {
        next()
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
};