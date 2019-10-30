const User = require('../users/userDb');

const logger = (req, res, next) => {
  let time = new Date();
  console.log('**************************************');
  console.log(`Request method: ${req.method}`);
  console.log(`URL: ${req.baseUrl}`);
  console.log(
    `Time: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );
  console.log('**************************************');
  next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;
  if (parseInt(id) > 0) {
    User.getById(id)
      .then(user => {
        if (!user) {
          res
            .status(404)
            .json({ message: 'The id does not correspond to a user' });
        }
        req.user = user;
        next();
      })
      .catch(err => {
        res.status(500).json({
          message: `Something happened while checking for the user: ${err.message}`
        });
      });
  } else {
    res.status(400).json({ message: 'A valid id is required' });
  }
};

const validateUser = (req, res, next) => {
  if (Object.keys(req.body).length) {
    let userData = { name: req.body.name };
    User.insert(userData)
      .then(user => {
        req.user = user;
      })
      .catch(err => {
        res.status(500).json({ message: "Oops couldn't create the user" });
      });
  } else {
    res
      .status(500)
      .json({ message: 'Please provide a valid user information' });
  }
};

const validatePost = (req, res, next) => {};

module.exports = { logger, validateUserId, validateUser, validatePost };
