const accountPanel = document.querySelector('.account__panel');
const openAccountPanelButton = document.querySelector('#open-account-panel');
const closeAccountPanelButton = document.querySelector('#close-account-panel');

const registerButton = document.querySelector('#register-button');
const loginButton = document.querySelector('#login-button');

let isAccountPanelHidden = true;

openAccountPanelButton?.addEventListener('click', () => {
    if (!isAccountPanelHidden) return;

    accountPanel.style.left = '0';
    isAccountPanelHidden = !isAccountPanelHidden;
});

closeAccountPanelButton?.addEventListener('click', () => {
    if (isAccountPanelHidden) return;

    accountPanel.style.left = '-410px';
    isAccountPanelHidden = !isAccountPanelHidden;
});

registerButton?.addEventListener('click', () => {
    window.location.assign('/html/register.html');
});
loginButton?.addEventListener('click', () => {
    window.location.assign('/html/login.html');
});