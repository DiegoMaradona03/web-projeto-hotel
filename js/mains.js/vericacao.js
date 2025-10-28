const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario || !usuario.token) {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

const btnSair = document.querySelector('.logout');
if (btnSair) {
    btnSair.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
}