const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const signature = process.env.SIGNATURE || require('../secrets').SIGNATURE;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  }
});

const hashPw = (pw) => {
  return crypto.pbkdf2Sync(pw, this.salt, 1000, 64, 'sha512')
        .toString('hex');
}

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash =  hashPw(password);
}

userSchema.methods.validPassword = function(password){
  return (this.hash === hashPw(password));
}

userSchema.methods.generateJwt = function(){
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiration.getTime() / 1000)
  }, signature);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
