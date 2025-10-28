const mobileButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileButton && mobileMenu) {
  mobileButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

const profileButton = document.getElementById('profile-menu-button');
const profileMenu = document.getElementById('profile-menu');

if (profileButton && profileMenu) {
  profileButton.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden');
  });
}

function toggleSenha(icon) {
  const input = icon.previousElementSibling;
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}