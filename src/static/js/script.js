const button = document.querySelector('button');

button.addEventListener('click', () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Lviv&appid=111e2769d1897b030167fee7eb6d5152&units=metric&lang=ua')
        .then(async result => await result.json())
        .then(result => {
            console.log(result);
        });
});