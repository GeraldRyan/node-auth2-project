const router = require('express').Router()

const Users = require('./user-model')
// const db = require('../data/dbconfig')

function restricted(req, res, next)
{
  if (req.session && req.session.loggedIn)
  {
    next()
  }
  else
  {
    res.status(400).json({ you: "cannot pass" })
  }
}

router.use(restricted)

router.get('/', (req, res) =>
{
  Users.find()
    // db('users').select('id', 'username').orderBy('id')
    .then(users =>
    {
      res.json(users)
    })
    .catch(err =>
    {
      console.log(err)
      res.send(err)
    })
})

module.exports = router