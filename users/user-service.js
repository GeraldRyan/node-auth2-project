module.exports = {
  isValid
}

function isValid(user){
  return Boolean(user.username && typeof user.password === 'string')
}