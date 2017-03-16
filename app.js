const path = require('path');
const cors = require('cors');
const url = require('url');
const express = require('express');
const favicon = require('serve-favicon')
const { createRequestHandler } = require('express-unpkg');

const app = express();

const REPO = process.env.REPO || 'https://registry.npm.taobao.org';
console.log(`Use repo: ${REPO}`);
const unpkg = createRequestHandler({
  registryURL: REPO,
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

const port = process.env.PORT || 8088;
app.listen(port, function() {
  console.log(`Start server on port: ${port}`);
});
