function getCSSFileName(url) {
    return url.slice(5);
}

function getJSFilename(url) {
    return url.slice(4);
}

function getHTMLFileName(url) {
    return url.slice(6);
}

module.exports = { getCSSFileName, getJSFilename, getHTMLFileName };