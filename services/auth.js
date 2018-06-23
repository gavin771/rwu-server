const jwt = require('jsonwebtoken')
const fs = require('fs')
const passport = require('passport')
const config = require('../config/constants')
const User = require('../models/User')

//should return a token for a valid user based on body
module.exports.login = (req, cb) => {
  cb({ token: generateToken(req.user, '1h') })
}

module.exports.logout = (req, cb) => {

}

const generateToken = (user, exp) => {
  const privateKey = fs.readFileSync('./config/jwt.key', 'utf8')
  const token = jwt.sign({
    sub: user.id,
    role: user.role,
    active: user.active,
  }, privateKey, {
      expiresIn: exp,
      algorithm: 'RS512'
    });
  return token;
}
