import axios from "https://cdn.skypack.dev/axios";

const form = document.querySelector('form');
const URL_API = 'https://api-projeto-hotel.vercel.app/usuarios';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        cpf: form.cpf.value,
        senha: form.senha.value,
    };

    const telefoneValor = form.telefone.value.trim();

    if (telefoneValor !== "") {
        dados.telefone = {
            create: [
                { numero: telefoneValor }
            ]
        };
    }

    try {
        const resp = await axios.post(URL_API, dados);

        if (resp.data) {
            const loginResp = await axios.post('https://api-projeto-hotel.vercel.app/login', {
                email: form.email.value,
                senha: form.senha.value
            });

            localStorage.setItem('usuario', JSON.stringify(loginResp.data));

            window.location.href = 'pagina_inicial.html';
        }
    } catch (error) {
        console.error(error);
    }
});