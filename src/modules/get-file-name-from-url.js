function getCSSFileName(url) {
    return url.slice(5);
}

function getJSFilename(url) {
    return url.slice(4);
}

module.exports = { getCSSFileName, getJSFilename };