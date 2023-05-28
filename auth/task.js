const xhr = new XMLHttpRequest();
const userId = document.getElementById('user_id');
const signin = document.querySelector('.signin');
const welcome = document.querySelector('.welcome');
const form = document.getElementById('signin__form');
const storageKey = 'userId';
const isAuthenticated = localStorage.getItem(storageKey);

if (isAuthenticated) {
    signin.classList.remove('signin_active');
    userId.textContent = isAuthenticated;
    welcome.classList.add('welcome_active');
} else {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        auth()
    });
};

function auth() {
    const formData = new FormData(form);
    form.reset();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.responseType = 'json';
    xhr.send(formData);
};

xhr.addEventListener('load', () => {
    if (xhr.response['success']) {
        localStorage.setItem(storageKey, xhr.response['user_id']);
        signin.classList.remove('signin_active');
        userId.textContent = xhr.response['user_id'];
        welcome.classList.add('welcome_active');
    } else {
        alert('Неверный логин/пароль');
    }
});

