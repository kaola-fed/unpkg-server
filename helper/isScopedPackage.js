// 顾名思义
function isScopedPackageRequest(reqUrl) {
    return reqUrl && reqUrl.startsWith && reqUrl.startsWith('/@');
}

module.exports = isScopedPackageRequest; 