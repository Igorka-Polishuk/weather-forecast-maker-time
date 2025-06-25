const selectRecentCity = document.querySelector("#select-recent-city");

function renderRecentCityBlock(cities) {
    const beginContext = `
        <option value="" disabled selected>Ваші недавні міста</option>
    `;
    let finalContext = `
        <option value="" disabled selected>Ваші недавні міста</option>
        <option value="delete_all">Видалити всі</option>
    `;

    if (!cities) {
        selectRecentCity.innerHTML = beginContext;
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