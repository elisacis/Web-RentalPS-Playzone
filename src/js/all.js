
// Header button
window.addEventListener("DOMContentLoaded", (event) => {
    // Toggle class
    const mobileMenu = document.querySelector('header nav .mobile-menu');
    const menu = document.querySelector('header nav .menu');
    mobileMenu.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
    // Remove class kalau diklik diluar
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !mobileMenu.contains(event.target)) {
            menu.classList.remove('show');
        }
    });
});