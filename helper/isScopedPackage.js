// 顾名思义
exports.isScopedPackageRequest = function (reqUrl) {
    return reqUrl && reqUrl.startsWith && reqUrl.startsWith('/@');
}