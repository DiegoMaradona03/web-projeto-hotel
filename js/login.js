import axios from "https://cdn.skypack.dev/axios";

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        email: form.email.value,
        senha: form.senha.value
    };

    try {
        // Ajuste da rota para bater com o back
        const resp = await axios.post('https://api-projeto-hotel.vercel.app/login', dados);

        if (resp.data.token) {
            localStorage.setItem('usuario', JSON.stringify(resp.data));

            alert('✅ Login realizado com sucesso!');

            window.location.href = 'pagina_inicial.html';
        }
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Usuário ou senha inválidos');
    }
});