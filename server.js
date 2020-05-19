
const express = require("express")
const helmet = require("helmet")
// const userRouter = require('./users/user-router.js')
// const authRouter = require('./auth/router.js')
const session = require('express-session')

const db = require("./data/dbconfig.js")

const server = express()

server.use(helmet())
server.use(express.json())
sessionConfig = {
  cookie:{
    maxAge: 1000 *60*60,
    secure: false, //send only over https (set as true in production)
    httpOnly: true, // means client JS cannot access cookie
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true, // in development set as true, in prodcution false gdr compliance 
  name: 'monster',
  secret: process.env.COOKIE_SECRET || 'keepitsecret, keepitsafe',

}
server.use(session(sessionConfig))

server.get("/",(req,res)=>{
  res.status(201).json("server running")
})

// server.use('/api/users', userRouter)
// server.use('/api/auth', authRouter)


module.exports = server