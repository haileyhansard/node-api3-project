const express = require('express');
const userDb = require('./userDb.js');
const postDb = require('../posts/postDb.js');

const { validateUser, validateUserId, validatePost } = require('../middlewares');

const router = express.Router();

router.post('/', async (req, res) => {
  // do your magic!
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: 'Unable to fetch users' });
  }
});

router.post('/:id/posts', [validateUserId, validatePost], async (req, res) => {
  // do your magic!
  try {
    const post = await postDb.insert({ ...req.body, user_id: req.params.id });
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Unable to create post' });
  }
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

router.get('/:id/posts', validateUserId, async (req, res) => {
  // do your magic!
  try {
    const posts = await postDb.get();
    const userId = Number(req.params.id);
    const postsByUser = posts.filter(post => post.user_id === userId);
    res.status(200).json(postsByUser);
  } catch  {
    res.status(500).json({ message: 'Unable to retrieve posts' });
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb
    .remove(req.params.id)
    .then((count) => {
      res.status(200).json({ message: `Deleted ${count === 1 ? '1 item' : count + ' items'} successfully!` });
    }) //this checks to see if it deleted 1 then it says item, but if the count is more than 1, it says items.
    .catch(() => {
      res.status(500).json({ message: "Unable to delete user" });
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  const id = Number(req.params.id);
  const changes = req.body;
  userDb
    .update(id, changes)
    .then(() => {
      res.status(200).json({ ...changes, id });
    })
    .catch(() => {
      res.status(500).json({ message: 'Unable to update user' })
    });
});

module.exports = router;
