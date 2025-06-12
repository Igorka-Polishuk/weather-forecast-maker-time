const selectCity = document.querySelector('#select-city');
const inputCity = document.querySelector('#city');

selectCity.addEventListener('change', () => {
    inputCity.value = selectCity.value;
});