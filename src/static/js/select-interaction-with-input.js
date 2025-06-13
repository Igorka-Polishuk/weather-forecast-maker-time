import { deleteAllRecentCities } from './process-local-storage.js';

const selectCity = document.querySelector('#select-base-city');
const selectRecentCity = document.querySelector("#select-lately-city");
const inputCity = document.querySelector('#city');

selectCity.addEventListener('change', () => {
    inputCity.value = selectCity.value;
});

selectRecentCity.addEventListener('change', () => {
    if (selectRecentCity.value === 'delete_all') 
        deleteAllRecentCities();
    else 
        inputCity.value = selectRecentCity.value;
});