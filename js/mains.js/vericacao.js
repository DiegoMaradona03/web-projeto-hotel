// Pega o usuário do localStorage
const usuario = JSON.parse(localStorage.getItem('usuario'));

// Se não existir ou não tiver token, volta pro login
if (!usuario || !usuario.token) {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

// Cria botão de sair
const btnSair = document.querySelector('.logout');
if (btnSair) {
    btnSair.addEventListener('click', (event) => {
        event.preventDefault(); // evita comportamento padrão do <a>
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
}