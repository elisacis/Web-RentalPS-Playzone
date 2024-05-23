document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.mobile-nav').addEventListener('click', () => {
    document.querySelector('header nav').classList.toggle('show');
  });
});
