import { renderRecentCityBlock } from './render-recent-city-block.js';

const STORAGE_KEY = "cities";

function rememberNewCity(city) {
    const storageValue = localStorage.getItem(STORAGE_KEY);

    if (!storageValue) {
        const newStorageValue = [city];

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(newStorageValue)
        );
    } else {
        const updatedStorageValue = JSON.parse(storageValue);
        if (!updatedStorageValue.includes(city)) {
            updatedStorageValue.unshift(city);
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedStorageValue)
            );
        }
    }

    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    renderRecentCityBlock(storageData);
}

function deleteAllRecentCities() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        alert("Поки що немає недавніх міст в списку");
        return;
    }

    localStorage.setItem(STORAGE_KEY, '');

    renderRecentCityBlock(localStorage.getItem(STORAGE_KEY));
}

export { rememberNewCity, deleteAllRecentCities, STORAGE_KEY };