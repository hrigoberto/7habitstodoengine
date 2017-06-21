require('dotenv');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGOURI || require('./secrets').MONGOURI;
const todoRouter = require('./routers/todo.router.js');
const userRouter = require('./routers/user.router.js');

require('./config/passport');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(mongoURI);

server.get('/', (req, res, next) => {
  res.send('BOOYA');
})

server.use(todoRouter);
server.use(userRouter);

server.listen(8080, () => {
  console.log('Now listening on port:', port);
})
