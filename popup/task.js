const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const showSuccess = document.querySelector('.show-success');

// document.cookie = "status=closed; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

const init = () => {
    if (getCookie('status') != 'closed') {
        modal.classList.add('modal_active');
        modalClose.addEventListener('click', () => {
            modal.classList.remove('modal_active');
            setCookie('status', 'closed');
        });
    };   
}

function setCookie(title, value) {
    document.cookie = title + '=' + encodeURIComponent(value) + '; SameSite=None; Secure';
};

function getCookie(title) {
    try {
        const pairs = document.cookie.split('; ');
        const cookie = pairs.find(p => p.startsWith(title + '='));
        return cookie.substr(title.length + 1);
    } catch {
        return null
    };
};

init();