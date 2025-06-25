const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');

const gettingFileName = require('./get-file-name-from-url.js');

async function processRequest(request, response) {
    if (request.url === '/' && request.method === 'GET') {
        const filePath = resolve('src', 'static', 'index.html');
        const fileContext = readFileSync(filePath).toString();

        response.writeHead(200, { 'content-type': 'text/html' });
        return response.end(fileContext);
    }

    if (existsSync(resolve('src', 'static', 'css', gettingFileName.getCSSFileName(request.url)))) {
        const filePath = resolve('src', 'static', 'css', gettingFileName.getCSSFileName(request.url));
        const fileContext = readFileSync(filePath).toString();

        response.writeHead(201, { 'content-type': 'text/css' });
        return response.end(fileContext);
    }

    if (existsSync(resolve('src', 'static', 'js', gettingFileName.getJSFilename(request.url)))) {
        const filePath = resolve('src', 'static', 'js', gettingFileName.getJSFilename(request.url));
        const fileContext = readFileSync(filePath).toString();

        response.writeHead(201, { 'content-type': 'application/javascript' });
        return response.end(fileContext);
    }
}

module.exports = { processRequest };