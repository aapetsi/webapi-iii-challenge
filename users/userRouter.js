const express = require('express');

// load users database model
const User = require('./userDb');

// load middlewares
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use((req, res, next) => {
  console.log('test');
  next();
});

router.post('/', [middlewares.logger, middlewares.validateUser], (req, res) => {
  res.json(req.user);
});

router.post('/:id/posts', (req, res) => {});

router.get('/', [middlewares.logger], (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'Something happened. Unable to get all users'
      });
    });
});

router.get(
  '/:id',
  [middlewares.logger, middlewares.validateUserId],
  (req, res) => {
    res.json(req.user);
  }
);

router.get(
  '/:id/posts',
  [middlewares.logger, middlewares.validateUserId],
  (req, res) => {
    User.getUserPosts(req.user.id)
      .then(posts => {
        if (!posts) {
          return res.status(404).json({ message: 'Posts not found' });
        }
        res.status(200).json(posts);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Something happened. Couldn't retrieve posts" });
      });
  }
);

router.delete(
  '/:id',
  [middlewares.logger, middlewares.validateUserId],
  (req, res) => {
    User.remove(req.user.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'Unable to delete user' });
      });
  }
);

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

router.use((err, req, res, next) => {
  res.status(500).json({ message: `Something strange happened: ${err}` });
});

module.exports = router;
