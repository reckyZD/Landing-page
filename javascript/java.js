// tooggle class
const  navbarNav = document.querySelector ('.navbar-nav');
document.querySelector('#hambuger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// menghilangkan hambuger saat di klik diluar sidebar
const hambuger = document.querySelector ('#hambuger-menu');
document.addEventListener('click', function (e) {
    if (!hambuger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});