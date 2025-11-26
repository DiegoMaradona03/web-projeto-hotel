import axios from "https://cdn.skypack.dev/axios";

const API_URL = "https://api-projeto-hotel.vercel.app";
const usuario = JSON.parse(localStorage.getItem("usuario"));

const campos = ["nome", "email", "cpf", "telefone", "senha"];
const inputs = campos.map(campo => document.getElementById(campo));

const btnEditar = document.getElementById("btn-editar");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar-edicao");
const fotoInput = document.getElementById("foto-input");
const btnFoto = document.getElementById("btn-foto");
const previewFoto = document.getElementById("preview-foto");

const config = {
  headers: { Authorization: `Bearer ${usuario.token}` }
};

async function carregarDados() {
    try {
        const res = await axios.get(`${API_URL}/usuarios/${usuario.id}`, config);
        const data = res.data;

        nome.value = data.nome;
        email.value = data.email;
        cpf.value = data.cpf;
        senha.value = data.senha;
        telefone.value = data.telefone[0]?.numero || "";
        usuario.telefoneId = data.telefone[0]?.id;

        if (data.fotoUrl) previewFoto.src = data.fotoUrl;

    } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do usuário!");
    }
}

carregarDados();

btnEditar.onclick = () => {
    inputs.forEach(i => i.disabled = false);
    btnFoto.classList.remove("disabled");
    btnEditar.classList.add("hidden");
    btnSalvar.classList.remove("hidden");
    btnCancelar.classList.remove("hidden");
};

btnCancelar.onclick = () => {
    inputs.forEach(i => i.disabled = true);
    btnFoto.classList.add("disabled");
    carregarDados();
    btnSalvar.classList.add("hidden");
    btnCancelar.classList.add("hidden");
    btnEditar.classList.remove("hidden");
};

fotoInput.onchange = e => {
    previewFoto.src = URL.createObjectURL(e.target.files[0]);
};

btnSalvar.onclick = async (e) => {
    e.preventDefault();

    await axios.patch(`${API_URL}/usuarios/${usuario.id}`, {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
        senha: senha.value
    }, config);

    if (usuario.telefoneId) {
        await axios.patch(`${API_URL}/telefones/${usuario.telefoneId}`, {
            numero: telefone.value,
            usuarioId: usuario.id
        }, config);
    }

    alert("Alterações salvas!");
    btnCancelar.click();
};

const modal = document.getElementById("modal-excluir");
document.getElementById("abrir-modal-excluir").onclick = () => modal.classList.remove("hidden");
document.getElementById("cancelar-excluir").onclick = () => modal.classList.add("hidden");
document.getElementById("confirmar-excluir").onclick = async () => {
    await axios.delete(`${API_URL}/usuarios/${usuario.id}`, config);
    localStorage.clear();
    window.location.href = "../login.html";
};