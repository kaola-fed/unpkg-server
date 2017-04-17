const { createRequestHandler } = require('express-unpkg');
const { OFFICIAL_REGISTRY_URL } = require('../config/consts')
const { isScopedPackageRequest } = require('../helper/isScopedPackage');
const { formatRegistryUrl } = require('../helper/formatRegistryUrl');

module.exports = function ({
    privateRegistryUrl
}) {
    let privateUnpkgService = createRequestHandler({
        registryURL: formatRegistryUrl(privateRegistryUrl),
        autoIndex: true
    });

    return function (req, res, next) {
        if (isScopedPackageRequest(req.url)) {
            return privateUnpkgService(req, res, next);
        }
        
        next();
    }
}