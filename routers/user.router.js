const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const errHandler = (code, err) => res.status(code).json({ msg: err });
const successMsgHandler = (key = 'msg', value = 'success') => res.status(200).json({ key: value });
const UNPWMsg = 'The username and/or password you have provided is invalid';


router.post('/signup', ( req, res ) => {
  let user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(err => err ? errHandler(500, err) : successMsgHandler());
});

router.post('/login', ( req, res, next ) => {
  passport.authenticate('local', ( err, user, data ) => {
    if (err) {
      return errHandler(err);
    };
    if (!user) {
      return errHandler(400, UNPWMsg);
    };
    if (user && !user.validPassword(req.body.password)) {
      return errHandler(401, UNPWMsg);
    };
    return successMsgHandler('token', user.generateJwt());
  })( req, res, next );
});

router.get('/users', ( req, res ) => {
  User.find({}, ( err, users ) => err ? errHandler(500, err) : successMsgHandler('users', users));
});

router.get('/users/:userId', ( req, res ) => {
  User.find({_id: req.params.userId}, ( err, user ) => err ? errHandler(500, err) : successMsgHandler('user', user));
});

router.put('/users/:userId', ( req, res ) => {
  User.findOneAndUpdate({_id: req.params.userId }, req.body, ( err, user) => err ? errHandler(500, err) : successMsgHandler());
});

router.delete('/users/:userId', ( req, res ) => {
  User.remove({_id: req.params.userId}, err => err ? errHandler(500, err) : successMsgHandler());
})

module.exports = router;
