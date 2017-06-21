const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function Auth(email, password, done){
    User.findOne({email}, (err, user) => {
      if(err){
        return done(err);
      }
      if(!user){ //if there is not a user with that email
        return done(null, false, {
          msg: "User not found"
        });
      }
      if(!user.validPassword(password)){
        return done(null, false, {
          msg: 'Authentication failed'
        });
      }
      return done(null, user);
    });
}));
