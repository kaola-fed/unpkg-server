const { createRequestHandler } = require('express-unpkg');
const { OFFICIAL_REGISTRY_URL } = require('../config/consts')

module.exports = function () {
    return createRequestHandler({
        registryURL: OFFICIAL_REGISTRY_URL,
        autoIndex: true
    });
}