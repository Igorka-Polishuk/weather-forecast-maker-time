require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

const { processRequest } = require('./src/modules/process-requests.js');
const { makeGetRequest } = require('./src/modules/make-https-requests.js');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const CURRENT_WEATHER_API = process.env.CURRENT_WEATHER_API;
const FUTURE_WEATHER_API = process.env.FUTURE_WEATHER_API;
const CITY_COORDINATES_GETTING_API = process.env.CITY_COORDINATES_GETTING_API;

const server = http.createServer((request, response) => {
    processRequest(request.url, response);
})
    .listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = new Server(server);
io.on('connection', socket => {
    socket.on('get_weather_forecast', async city => {
        await makeGetRequest(CURRENT_WEATHER_API + `?q=${city}&appid=${API_KEY}&units=metric&lang=ua`)
            .then(async answer => {
                io.emit('access_weather_forecast', answer);

                await makeGetRequest(`${CITY_COORDINATES_GETTING_API}?q=${city}&limit=1&appid=${API_KEY}`)
                    .then(async cityCoordinates => {
                        console.log(cityCoordinates[0].lat);
                        await makeGetRequest(
                            `${FUTURE_WEATHER_API}?lat=${cityCoordinates[0].lat}&lon=${cityCoordinates[0].lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric&lang=ua`
                        ).then(futureWeather => {
                            io.emit('access_future_weather', futureWeather);
                        });
                    });
            })
            .catch(error => {
                io.emit('error_access_weather_forecast', error);
            });
    });
});