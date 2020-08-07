const express = require('express');
const postDb = require('../posts/postDb.js');
const {validatePost, validatePostId} = require('../middlewares');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb
  .get()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(()=>{
    res.status(500).json({message: 'Unable to retrieve posts'})
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb
  .getById(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(() => {
    res.status(500).json({ message: 'Unable to retrieve post' })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb
    .remove(req.params.id)
    .then((count) => {
      res.status(200).json({message: `${count === 1 ? '1 item' : count + 'items'} deleted successfully!`});
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete post" });
    })
});

router.put('/:id', [validatePostId, validatePost], (req, res) => {
  // do your magic!
  const id = req.params.id;
  const changes = req.body;
  postDb
    .update(id, changes)
    .then(() => {
      res.status(200).json({...changes, id });
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to update post" });
    });
});

module.exports = router;
