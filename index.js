require('dotenv').config();

const { createServer } = require('http');
const { Server } = require('socket.io');

const { processRequest } = require('./src/modules/process-requests.js');
const { makeGetRequest } = require('./src/modules/make-https-requests.js');
const { SQLiteSystem } = require('./src/modules/process-database-requests.js');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const CURRENT_WEATHER_API = process.env.CURRENT_WEATHER_API;
const FUTURE_WEATHER_API = process.env.FUTURE_WEATHER_API;

const server = createServer((request, response) => {
    processRequest(request.url, response);
})
    .listen(PORT, () => console.log(`http://localhost:${PORT}`));

const io = new Server(server);
io.on('connection', async socket => {
     const databaseController = new SQLiteSystem();

    try {
        await databaseController.awaitForDatabase();

        socket.on('get_weather_forecast', async city => {
            await makeGetRequest(CURRENT_WEATHER_API + `?q=${city}&appid=${API_KEY}&units=metric&lang=ua`)
                .then(async answer => {
                    socket.emit('access_weather_forecast', { city, ...answer });

                    await makeGetRequest(
                        `${FUTURE_WEATHER_API}?lat=${answer.coord.lat}&lon=${answer.coord.lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric&lang=ua`
                    ).then(futureWeather => {
                        socket.emit('access_future_weather', futureWeather);
                    });
                })
                .catch(error => {
                    socket.emit('error_access_weather_forecast', error);
                });
        });

        socket.on('add_new_user', async user => {
            try {
                const result = await databaseController.addNewUser(user);

                socket.emit('add_new_user_result', result);
            } catch (error) {
                socket.emit('add_new_user_result', error);
            }
        });

        socket.on('disconnect', async () => {
            await databaseController.closeDatabase();
        });
    } catch (error) {
        console.error(error.message);
    }
});