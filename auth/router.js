const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Users = require('../users/user-model.js')
const { isValid } = require('../users/user-service')
const configVars = require("../config/vars")

router.post('/register', (req, res) =>
{
  const credentials = req.body

  if (isValid(credentials))
  {
    const rounds = process.env.BCRYPT_ROUNDS || 8

    // turn password into hash 
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash
    //save user to db
    Users.add(credentials).then(user =>
    {
      res.status(201).json({ data: user })
    })
      .catch(err => { res.status(500).json({message: err}) })

  }
  else
  {
    res.status(400).json({ message: "Please provide username and password" })
  }
})

router.post('/login', (req, res) =>
{
  const { username, password } = req.body

  if (isValid(req.body))
  {
    Users.findBy({ username: username }).then(([user]) =>
    {
      if (user && bcryptjs.compareSync(password, user.password))
      {
        // create session
        // req.session.loggedIn = true
        // req.session.user = user

      const token = createToken(user)

        res.status(200).json(`welcome to our API. Token= ${token}`)
      }
      else
      {
        res.status(401).json({ message: "invalid credentials. You shall not pass", token, user })
      }
    }).catch(err =>
    {
      res.status(500).json({ message: err.message})
    })
      // turn password into hash 
      //save user to db
      .catch(err => { res.status(500).json(err) })

  }
  else
  {
    res.status(400).json({ message: "Please provide username and password/invalid credentials. You shall not pass" })
  }
})


router.get('/logout', (req, res) =>{
  if (req.session) {
    req.session.destroy(err=>{
      if(err){
        res.status(500).json({message:"we could not log you out"})
      }
      else{
        res.status(204).end()
      }
    })
  }
  else{
    res.status(204).end()

  }
})

function createToken(user){
  const payload={
    sub:user.id,
    username:user.username,
    department:user.department
  }
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, configVars.jwtSecret, options)
}
module.exports = router