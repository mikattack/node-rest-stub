
var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = 48200;


app.disable('x-powered-by');
app.use(bodyParser.json({
  limit:  '50mb',
  strict: false
}));


// Delayed response
app.all('/delay/:time', function (req, res) {
  setTimeout(function () { res.status(200).send(null); }, req.params.time * 1000);
});


// Responds with a given status code and prints any body content to the console
app.all('/echo/:statusCode', function (req, res) {
 console.log(JSON.stringify(req.body));
 res.status(req.params.statusCode).send(null);
});


// Responds with a given status code
app.all('/status/:statusCode', function (req, res) {
 res.status(req.params.statusCode).send(null);
});


// Fails a given percentage of the time
app.all('/wildcard/:percentage', function (req, res) {
 var failed = (Math.random() * 100 < req.params.percentage);
 res.status(failed ? 500 : 200).send(null);
});


// Generic catchall responder
app.all('*', function (req, res) {
  var delay = req.headers['x-delay'] || null;
  var statusCode = req.headers['x-status'] || 200;

  if (delay) {
    setTimeout(function () { res.status(statusCode).send(null); }, delay);
  } else {
    res.status(statusCode).send(null);
  }
});


app.listen(port, function () {
 console.log('REST stub server listening on port ' + port);
});
