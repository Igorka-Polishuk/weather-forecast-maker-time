const { createServer } = require('http');
const { Server } = require('socket.io');

const { processRequest } = require('./src/modules/process-requests.js');
const { makeGetRequest } = require('./src/modules/make-https-requests.js');

const PORT = 4000;

const server = createServer((request, response) => {
    return processRequest(request, response);
})
    .listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = new Server(server);
io.on('connection', async socket => {
    socket.on('get_weather_forecast', async city => {
        await makeGetRequest(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=111e2769d1897b030167fee7eb6d5152&units=metric&lang=ua`)
            .then(async answer => {
                socket.emit('access_weather_forecast', { city, ...answer });

                await makeGetRequest(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${answer.coord.lat}&lon=${answer.coord.lon}&exclude=current,minutely,daily,alerts&appid=111e2769d1897b030167fee7eb6d5152&units=metric&lang=ua`
                ).then(futureWeather => {
                    socket.emit('access_future_weather', futureWeather);
                });
            })
            .catch(error => {
                socket.emit('error_access_weather_forecast', error);
            });
    });
});