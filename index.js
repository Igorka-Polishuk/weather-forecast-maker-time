const https = require('https');
const http = require('http');

const PORT = 3000;

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        if (request.url === '/api/weather') {
            https.get('https://api.openweathermap.org/data/2.5/weather?q=Lviv&appid=111e2769d1897b030167fee7eb6d5152&units=metric&lang=ua', result => {
                let finalData = '';

                result.on('data', data => { finalData += data; });
                result.on('end', () => {
                    response.writeHead(200, {'content-type': 'application/json'});
                    response.end(finalData);
                })
                request.on('error', () => {
                    response.writeHead(200, {'content-type': 'application/json'});
                    response.end(JSON.stringify({message: "error"}));
                });
            });
        }
    }
})
    .listen(PORT, () => console.log(`http://localhost:${PORT}`));