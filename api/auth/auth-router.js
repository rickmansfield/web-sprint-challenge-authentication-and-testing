const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const { tokenBuilder } = require('./token-builder')
const { 
  validateUserBody, 
  checkUserNameFree, 
  validateCredentials 
} = require('./auth-middleware')

router.post('/register', validateUserBody, checkUserNameFree, (req, res) => {
  // res.end('implement register, please!');
  const { username, password } = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(password, rounds)
  const newUser = {
    username: username,
    password: hash,
  }

  Users.add(newUser)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })

});

router.post('/login', validateCredentials, validateUserBody, (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
