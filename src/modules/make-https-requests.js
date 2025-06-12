const https = require('https');

function makeGetRequest(url) {
    let finalData = '';

    return new Promise((resolve, reject) => {
        https.get(url, answer => {
            answer.on('data', chunk => { finalData += chunk; });
            answer.on('end', () => {
                finalData = JSON.parse(finalData);

                console.log(finalData);

                if (finalData.message)
                    reject(finalData);

                resolve(finalData);
            });
        }).on('error', error => { reject({message: error.message}); });
    });
}

module.exports = { makeGetRequest };