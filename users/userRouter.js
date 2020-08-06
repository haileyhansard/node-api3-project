const express = require('express');
const userDb = require('./userDb.js');
const posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Users info could not be retrieved" })
    })
});


router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  console.log("validateUserId id #", req.params.id)
  userDb.getById(req.params.id)
  .then(id => {
    if (id){
      next()
    } else {
      res.status(400).json({ message: "invalid user id" })
    }
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
};

function validateUser(req, res, next) { //CURRENTLY STUCK AT THIS ONE.
  // do your magic!
  // if(().length === 0){
  //   res.status(400).json({ message: "missing user data" })
  // }
}
//validateUser validates the body on a request to create a new user
//if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
//if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }


function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
