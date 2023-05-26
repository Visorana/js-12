const textArea = document.querySelector('textarea');
const clearButton = document.getElementById('clear');
const storageKey = 'text';

const init = () => {
  textArea.value = localStorage.getItem(storageKey);
  textArea.addEventListener('input', () => {
    localStorage.setItem(storageKey, textArea.value);
  });
  clearButton.addEventListener('click', () => {
    textArea.value = '';
    localStorage.removeItem(storageKey);
  });
}

init();