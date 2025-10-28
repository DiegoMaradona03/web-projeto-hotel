import axios from "https://cdn.skypack.dev/axios";

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        email: form.email.value,
        senha: form.senha.value
    };

    try {
        const resp = await axios.post('https://api-projeto-hotel.vercel.app/login', dados);

        if (resp.data.token) {
            localStorage.setItem('usuario', JSON.stringify(resp.data));

            window.location.href = 'pagina_inicial.html';
        }
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Usuário ou senha inválidos');
    }
});

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