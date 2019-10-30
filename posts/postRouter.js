const express = require('express');

const router = express.Router();

// import db
const db = require('./postDb');

// import middlewares
const middleware = require('../middlewares/index');

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Post route works' });
});

router.get('/', [middleware.logger], (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get(
  '/:id',
  [middleware.logger, middleware.validateUserId],
  (req, res) => {}
);

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
