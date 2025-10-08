const mobileButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const profileButton = document.getElementById('profile-menu-button');
const profileMenu = document.getElementById('profile-menu');

profileButton.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
});