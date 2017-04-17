exports.formatRegistryUrl = function (registryURL) {
    if (registryURL.endsWith('/')) {
        registryURL = registryURL.replace(/\/$/, '');
    }

    return registryURL;
}