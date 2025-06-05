
<<<<<<< HEAD
const weatherInfoBlock = document.querySelector('.weather__info');
const cityHeaderForm = document.querySelector('.header__form');

cityHeaderForm.addEventListener('submit', event => {
    event.preventDefault();

    const city = event.target['city'].value;

    if (!city) {
        alert('Field not to has to be empty!');
        return;
    }

    socket.emit('get_weather_forecast', city);
    socket.on('access_weather_forecast', response => {
        weatherInfoBlock.innerHTML = `
            <div class="weather__info__city">
                    <h2>${city}</h2>
                </div>
                <div class="weather__info__temperature">${response.main.temp}°С</div>
                <div class="weather__info__addiction">
                    <div class="weather__info__addiction__block">
                        <p class="addiction__block__property__name">Відчувається як</p>
                        <p class="addiction__block__property__value">${response.main.feels_like}°С</p>
                    </div>
                    <div class="weather__info__addiction__block">
                        <p class="addiction__block__property__name">Вологість</p>
                        <p class="addiction__block__property__value">${response.main.humidity}%</p>
                    </div>
                    <div class="weather__info__addiction__block">
                        <p class="addiction__block__property__name">Швидкість вітру</p>
                        <p class="addiction__block__property__value">${response.wind.speed} км/год</p>
                    </div>
                    <div class="weather__info__addiction__block">
                        <p class="addiction__block__property__name">Погода</p>
                        <p class="addiction__block__property__value">${response.weather[0].description}</p>
                    </div>
                </div>
        `;
    });
});
=======
>>>>>>> db0248c330aee191f3827579ee4478d29728c73b
