module.exports = function logRequest (req, _, next) {
  req.name = req.headers.name;
  console.log(`[${new Date().toISOString()}] - ${req.method} request to ${req.url}`)
  next();
};

//you can use _ if the parameter is not being used to get rid of the error