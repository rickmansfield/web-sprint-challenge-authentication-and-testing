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

router.post('/login', validateUserBody, validateCredentials,  (req, res) => {
  // res.end('implement login, please!');
  let { username, password } = req.body
  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user)
        res.status(200).json({
          message: `welcome, ${username}`,
          token: token,
        })
      } else {
        res.status(401).json({ 
          message: 'invalid credentials' 
        })
      }
    })
    .catch((err) => {
      res.status(500).json(err.message)
    })
});

module.exports = router;
