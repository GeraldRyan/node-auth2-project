const jwt = require('jsonwebtoken')
const secret = require('../config/vars').jwtSecret

module.exports = (req, res, next) =>
{
  // add code here to protect routes
  const token = req.headers.authorization;
  if (token)
  {

    jwt.verify(token, secret, (error,decodedToken)=>{
      if(error){
        //the token is invalid
        res.status(401).json({message: "you cannot pass!"})
      }
      else{
        //the token is good
        req.jwt = decodedToken
        next()
      }
    })
  }
  else
  {
    res.status(400).json({message:"Please provide authentication information"})
  }
}

//mvp