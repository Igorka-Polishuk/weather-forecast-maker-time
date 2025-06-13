const wrapper = document.querySelector('.wrapper');

const WEATHER_DESCRIPTIONS = {
    'небо': () => {
        wrapper.style.background = `linear-gradient(90deg,rgb(166, 255, 248) 0%, rgb(0, 140, 255) 100%)`;
    },
    'хмарно': () => {
        wrapper.style.background = `linear-gradient(180deg,rgba(91, 138, 133, 1) 0%, rgba(79, 220, 255, 1) 100%)`;
    },
    'дощ': () => {
        wrapper.style.background = 'linear-gradient(180deg,rgba(44, 84, 84, 1) 0%, rgba(44, 90, 102, 1) 53%, rgba(79, 220, 255, 1) 100%)';
    },
    'сніг': () => {
        wrapper.style.background = 'linear-gradient(180deg,rgba(220, 230, 230, 1) 0%, rgba(140, 146, 150, 1) 53%, rgba(103, 109, 110, 1) 100%)';
    }
};

function parseWeatherDescription(description) {
    if (description.toLowerCase().includes('хмар'))
        WEATHER_DESCRIPTIONS['хмарно']();

    if (description.toLowerCase().includes('сніг'))
        WEATHER_DESCRIPTIONS['сніг']();

    if (description.toLowerCase().includes('небо'))
        WEATHER_DESCRIPTIONS['небо']();
}

export { parseWeatherDescription };
