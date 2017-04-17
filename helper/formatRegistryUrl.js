// 格式化源地址
function formatRegistryUrl (registryURL) {
    if (registryURL.endsWith('/')) {
        registryURL = registryURL.replace(/\/$/, '');
    }

    return registryURL;
}

module.exports = formatRegistryUrl;