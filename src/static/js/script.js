import { renderMainWeatherBlock } from './render-main-weather-block.js';
import { parseWeatherDescription } from './change-background.js';
import { renderFutureWeatherBlocks } from './render-future-weather-blocks.js';
import { rememberNewCity, STORAGE_KEY } from './process-local-storage.js';
import { renderRecentCityBlock } from './render-lately-city-block.js';

const socket = io();

const weatherInfoBlock = document.querySelector('.weather__info');
const futureWeatherInfoBlock = document.querySelector('.future__weather__info');
const cityHeaderForm = document.querySelector('.header__form');

const startStorageData = localStorage.getItem(STORAGE_KEY);

if (startStorageData)
    renderRecentCityBlock(JSON.parse(startStorageData));
else
    renderRecentCityBlock(null);

cityHeaderForm.addEventListener('submit', event => {
    event.preventDefault();

    let city = event.target['city'].value;

    cityHeaderForm.city.value = '';

    if (!city) {
        alert('Field not to has to be empty!');
        return;
    }

    socket.emit('get_weather_forecast', city);
});

socket.on('access_weather_forecast', response => {
    weatherInfoBlock.style.display = 'flex';
    weatherInfoBlock.innerHTML = renderMainWeatherBlock({ city, ...response });
    parseWeatherDescription(response.weather[0].description);
    rememberNewCity(response.city);
});

socket.on('access_future_weather', futureWeather => {
    futureWeatherInfoBlock.style.display = 'flex';
    futureWeatherInfoBlock.innerHTML = renderFutureWeatherBlocks(futureWeather);
});

socket.on('error_access_weather_forecast', error => {
    console.log(error);
});
