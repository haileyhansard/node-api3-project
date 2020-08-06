const express = require('express');

const server = express();

//Global Middleware
server.use(express.json());
server.use(logger);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  req.name = req.headers.name;
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`)
  next();
};

module.exports = server;
