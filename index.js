require('dotenv').config();

const http = require('http');
const https = require('https');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const CURRENT_WEATHER_API = process.env.CURRENT_WEATHER_API;
const FUTURE_WEATHER_API = process.env.FUTURE_WEATHER_API;
const CITY_COORDINATES_GETTING_API = process.env.CITY_COORDINATES_GETTING_API;

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        const context = fs.readFileSync(path.resolve('src', 'static', 'index.html'));
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(context.toString());
    } else if (request.url.includes('root.css')) {
        const context = fs.readFileSync(path.resolve('src', 'static', 'css', 'root.css'));
        response.writeHead(200, {'content-type': 'text/css'});
        response.end(context.toString());
    }
    else if (request.url.includes('index.css')) {
        const context = fs.readFileSync(path.resolve('src', 'static', 'css', 'index.css'));
        response.writeHead(200, {'content-type': 'text/css'});
        response.end(context.toString());
    } else if (request.url.includes('script.js')) {
        const context = fs.readFileSync(path.resolve('src', 'static', 'js', 'script.js'));
        response.writeHead(200, {'content-type': 'application/javascript'});
        response.end(context.toString());
    }
})
    .listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = new Server(server);
io.on('connection', socket => {
    socket.on('get_weather_forecast', city => {
        https.get(CURRENT_WEATHER_API + `?q=${city}&appid=${API_KEY}&units=metric&lang=ua`, answer => {
            let data = '';

            answer.on('data', chunk => { data += chunk; });
            answer.on('end', () => {
                const response = JSON.parse(data);
                socket.emit('access_weather_forecast', response);
            });
        });
    });
});