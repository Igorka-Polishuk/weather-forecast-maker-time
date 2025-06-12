function renderMainWeatherBlock(infoObject) {
    return `
    <div class="weather__info__city">
        <h2>${infoObject.city}</h2>
    </div>
    <div class="weather__info__temperature">${infoObject.main.temp}°С</div>
    <div class="weather__info__addiction">
        <div class="weather__info__addiction__block">
            <p class="addiction__block__property__name">Відчувається як</p>
            <p class="addiction__block__property__value">${infoObject.main.feels_like}°С</p>
        </div>
        <div class="weather__info__addiction__block">
            <p class="addiction__block__property__name">Вологість</p>
            <p class="addiction__block__property__value">${infoObject.main.humidity}%</p>
        </div>
        <div class="weather__info__addiction__block">
            <p class="addiction__block__property__name">Швидкість вітру</p>
            <p class="addiction__block__property__value">${infoObject.wind.speed} км/год</p>
        </div>
        <div class="weather__info__addiction__block">
            <p class="addiction__block__property__name">Погода</p>
            <p class="addiction__block__property__value">${infoObject.weather[0].description}</p>
            </div>
        </div>
    `;
}

export { renderMainWeatherBlock };