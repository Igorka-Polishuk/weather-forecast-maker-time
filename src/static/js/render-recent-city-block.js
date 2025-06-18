const selectRecentCity = document.querySelector("#select-recent-city");

function renderRecentCityBlock(cities) {
    let finalContext = `
        <option value="" disabled selected>Ваші недавні міста</option>
        <option value="delete_all">Видалити всі</option>
    `;

    if (!cities) {
        selectRecentCity.innerHTML = finalContext;
        return;
    }

    cities.forEach(city => {
        finalContext += `
            <option value="${city}">${city}</option>
        `;
    });

    selectRecentCity.innerHTML = finalContext;
}

export { renderRecentCityBlock };