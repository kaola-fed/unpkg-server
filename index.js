const path = require('path');
const cors = require('cors');
const url = require('url');
const express = require('express');
const favicon = require('serve-favicon')
const { createRequestHandler } = require('express-unpkg');

const REPO_URL = process.env.REPO_URL || 'https://registry.npm.taobao.org';
const app = express();

app.use(cors());

const unpkg = createRequestHandler({
  registryURL: REPO_URL,
  autoIndex: true,
});

app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(function(req, res, next) {
  req.url = url.parse(req.url).pathname;

  return next();
});

app.all('/', function(req, res) {
  res.send('Ref: unpkg.com');
});

app.use(unpkg);

const port = process.env.PORT || 8088;
app.listen(port, function() {
  console.log(`Start server on port: ${port}`);
});
