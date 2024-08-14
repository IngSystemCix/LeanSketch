const buttonTheme = document.querySelector('#button-theme');
let checkTheme = true;
buttonTheme.addEventListener('click', () => {
    const html = document.querySelector('html');
    html.classList.toggle('dark');
    if (checkTheme) {
        buttonTheme.classList.remove('bi-brightness-low-fill');
        buttonTheme.classList.add('bi-moon-stars-fill');
    }else{
        buttonTheme.classList.remove('bi-moon-stars-fill');
        buttonTheme.classList.add('bi-brightness-low-fill');
    }
    checkTheme = !checkTheme;
});