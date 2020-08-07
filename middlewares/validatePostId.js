const postDb = require('../posts/postDb');

module.exports = function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id)
    .then(id => {
      if (id) {
        next()
      } else {
        res.status(400).json({ message: "invalid post id" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
}