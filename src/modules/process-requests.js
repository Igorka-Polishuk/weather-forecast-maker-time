const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');

const gettingFileName = require('./get-file-name-from-url.js');

function processRequest(url, response) {
    if (url === '/') {
        const filePath = resolve('src', 'static', 'index.html');
        const fileContext = readFileSync(filePath).toString();

        response.writeHead(200, { 'content-type': 'text/html' });
        return response.end(fileContext);
    } else {
        if (existsSync(resolve('src', 'static', 'css', gettingFileName.getCSSFileName(url)))) {
            const filePath = resolve('src', 'static', 'css', gettingFileName.getCSSFileName(url));
            const fileContext = readFileSync(filePath).toString();

            response.writeHead(201, {'content-type': 'text/css'});
            return response.end(fileContext);
        } else if (existsSync(resolve('src', 'static', 'js', gettingFileName.getJSFilename(url)))) {
            const filePath = resolve('src', 'static', 'js', gettingFileName.getJSFilename(url));
            const fileContext = readFileSync(filePath).toString();

            response.writeHead(201, {'content-type': 'application/javascript'});
            return response.end(fileContext);
        }
    }
}

module.exports = { processRequest };