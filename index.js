const path = require('path');
const cors = require('cors');
const url = require('url');
const express = require('express');
const favicon = require('serve-favicon')
const { createRequestHandler } = require('express-unpkg');

const app = express();

const unpkg = createRequestHandler({
  registryURL: process.env.REPO_URL,
  autoIndex: true,
});

app.use(cors());
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(function(req, res, next) {
  req.url = url.parse(req.url).pathname;

  return next();
});

app.all('/', function(req, res) {
  res.send('Ref: unpkg.com');
});

app.use(unpkg);

app.listen(process.env.PORT, function() {
  console.log(`Start server on port: ${process.env.PORT}`);
});
