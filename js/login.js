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
    }
});