const socket = io();

const registerForm = document.querySelector('.register__form');
const loginForm = document.querySelector('.login__form');

registerForm?.addEventListener('submit', event => {
    event.preventDefault();

    socket.emit('add_new_user', {
        login: event.target['login'].value,
        password: event.target['password'].value
    });

    registerForm.reset();
});

socket.on('add_new_user_result', result => {
    alert(result.message);
});