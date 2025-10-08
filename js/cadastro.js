import axios from "https://cdn.skypack.dev/axios";

const form = document.querySelector('form');
const URL_API = 'https://api-projeto-hotel.vercel.app/usuarios'; // rota ajustada

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Dados do usuário + telefone
    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        cpf: form.cpf.value,
        senha: form.senha.value,
        telefone: {
            create: [
                { numero: form.telefone.value }
            ]
        }
    };

    try {
        // Cria usuário com telefone
        const resp = await axios.post(URL_API, dados);

        if (resp.data) {
            // Login automático após cadastro

            alert('✅ Usuário cadastrado com sucesso!');

            const loginResp = await axios.post('https://api-projeto-hotel.vercel.app/login', {
                email: form.email.value,
                senha: form.senha.value
            });

            // Salva token do usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(loginResp.data));

            alert('✅ Login automático realizado com sucesso!');

            // Redireciona para a página inicial
            window.location.href = 'pagina_inicial.html';
        }
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Erro ao cadastrar usuário');
    }
});