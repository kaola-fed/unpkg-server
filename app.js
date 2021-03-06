// Usage: node app.js <PORT> <REPO>
const path = require('path');
const cors = require('cors');
const url = require('url');
const express = require('express');
const favicon = require('serve-favicon');
const privateUnpkgService = require('./middleware/privateUnpkgService');
const officialUnpkgService = require('./middleware/officialUnpkgService');

const app = express();
const port = process.argv[2] || 8088;
const privateRegistryUrl = process.argv[3];

app.use(cors());
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(function(req, res, next) {
  req.url = url.parse(req.url).pathname;
  return next();
});

app.all('/', function(req, res) {
  res.send('Ref: unpkg.com');
});

if (privateRegistryUrl) {
  app.use(privateUnpkgService({
    privateRegistryUrl
  }));
}

app.use(officialUnpkgService());

app.listen(port, function() {
  console.log(`Start server on port: ${port}`);
});