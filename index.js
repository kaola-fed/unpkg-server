const { createServer } = require('express-unpkg');

const REPO_URL = 'https://registry.npm.taobao.org';

const server = createServer({
  registryURL: REPO_URL,
  autoIndex: true,
});

const port = process.env.PORT || 8088;
server.listen(port, function() {
  console.log(`Start server on port: ${port}`);
});