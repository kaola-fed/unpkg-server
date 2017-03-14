const express = require('express');
const { createRequestHandler } = require('express-unpkg');

const REPO_URL = 'https://registry.npm.taobao.org';
const app = express();

const unpkg = createRequestHandler({
  registryURL: REPO_URL,
  autoIndex: true,
});

app.use(unpkg);

const port = process.env.PORT || 8088;
app.listen(port, function() {
  console.log(`Start server on port: ${port}`);
});