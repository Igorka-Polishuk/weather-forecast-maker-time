function renderFutureWeatherBlocks(infoObject) {
    const now = new Date();
    
    let hours = now.getHours();
    let finalData = '';

    for (let i = 0; i <= 5; i++) {
        hours += 3;
        if (hours >= 24) hours = 0;
        const icon = chooseIcon(infoObject.list[i].weather[0].description)
        finalData += `
            <div class="future__weahter__block">
                <p>${hours}:00</p>
                <p>${infoObject.list[i].main.temp}°С</p>
                <p>${icon}</p>
            </div>
        `;
    }

    return finalData;
}

function chooseIcon(description) {
    if (description.includes('хмар')) 
        return '<i class="fa-solid fa-cloud"></i>';
    if (description.includes('дощ') || description.includes('злив'))
        return '<i class="fa-solid fa-umbrella"></i>';
    if (description.includes('небо'))
        return '<i class="fa-solid fa-sun"></i>';
    if (description.includes('сніг'))
        return '<i class="fa-solid fa-snowflake"></i>';
    if (description.includes('торнадо'))
        return '<i class="fa-solid fa-tornado"></i>';
    if (description.includes('вітр'))
        return '<i class="fa-solid fa-wind"></i>';
    
}

export { renderFutureWeatherBlocks };