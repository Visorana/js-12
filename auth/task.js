const xhr = new XMLHttpRequest();
const login = document.querySelector('input[type="text"]');
const password = document.querySelector('input[type="password"]');
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
    const formData = new FormData();
    formData.append('login', login.value);
    formData.append('password', password.value);
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
    xhr.send(formData);
};

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            console.log(`The request has been completed successfully. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
        } else {
            console.log(`There has been an error with the request. Status code: ${xhr.status}, status response: ${xhr.responseText}`);
        };

        const response = JSON.parse(xhr.response)

        if (response['success']) {
            localStorage.setItem(storageKey, response['user_id']);
            signin.classList.remove('signin_active');
            userId.textContent = response['user_id'];
            welcome.classList.add('welcome_active');
        } else {
            alert('Неверный логин/пароль');
        }
    };
});

