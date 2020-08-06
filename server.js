const express = require('express');
const {logRequest: logger} = require('./middlewares'); //destructuring logRequest and re-naming it logger
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

//Global Middleware
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
//moved to middlewares folder


module.exports = server;
