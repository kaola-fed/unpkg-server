const ip = require('ip');
const express = require('express');
const { createRequestHandler } = require('express-unpkg');

const REPO_URL = 'https://registry.npm.taobao.org';
const app = express();

const unpkg = createRequestHandler({
  registryURL: REPO_URL,
  autoIndex: true,
});

const isInWhiteList = function(referer) {
  if (!referer) return true;
  return [
    /kaola\.com/,
    /netease\.com/,
    /163\.com/,
  ].some(function(d) {
    return d.test(referer);
  });
}

app.use(function(req, res, next) {
  if (ip.isPrivate(req.ip)) return next();
  if (isInWhiteList(req.get('Referer'))) return next();

  res.status(403).send('403 Forbidden');
});

app.all('/', function(req, res) {
  res.send('Ref: unpkg.com');
});

app.use(unpkg);

const port = process.env.PORT || 8088;
app.listen(port, '0.0.0.0', function() {
  console.log(`Start server on port: ${port}`);
});