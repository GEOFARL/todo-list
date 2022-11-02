import './style.scss';

const toggleBtn = document.querySelector('header button');

toggleBtn.addEventListener('click', () => {
    const nav = document.querySelector('.left-part');
    if (nav.style.display === 'none') {
        nav.style.display = 'block';
    }
    else 
        nav.style.display = 'none';
})