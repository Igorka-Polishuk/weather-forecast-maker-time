const accountPanel = document.querySelector('.account__panel');

const cookies = document.cookie;

if (!cookies) {
    accountPanel.innerHTML = renderWithoutCookies();
}

function renderWithoutCookies() {
    return `
        <h2>Создайте свій профіль</h2>
        <button id="close-account-panel">X</button>
        <button id="register-button">Зарегеструватися</button>
        <h3 id="login-subtitle">Вже маєте профіль?</h3>
        <button id="login-button">Увійти</button>
        <h3 id="bottom-subtitle">Ваші недавні та збережені міста будуть зберігатися в нас</h3>
    `;
}