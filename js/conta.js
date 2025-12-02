import axios from "https://cdn.skypack.dev/axios";

const API_URL = "https://api-projeto-hotel.vercel.app";
const usuario = JSON.parse(localStorage.getItem("usuario"));

const campos = ["nome", "email", "cpf", "senha"];
const inputs = campos.map(campo => document.getElementById(campo));

const btnEditar = document.getElementById("btn-editar");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar-edicao");
const fotoInput = document.getElementById("foto-input");
const btnFoto = document.getElementById("btn-foto");
const previewFoto = document.getElementById("preview-foto");

const listaTelefones = document.getElementById("lista-telefones");
const btnAddTelefone = document.getElementById("btn-add-telefone");

// modais telefones
const modalTel = document.getElementById("modal-telefone");
const inputTel = document.getElementById("telefone-input");
const tituloTel = document.getElementById("modal-telefone-titulo");
const btnSalvarTel = document.getElementById("confirmar-telefone");
let telefoneEdicaoId = null;

// modal excluir telefone
const modalExcluirTel = document.getElementById("modal-excluir-telefone");
const btnConfirmDelTel = document.getElementById("confirmar-excluir-telefone");

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
        senha.value = "";

        if (data.fotoUrl) previewFoto.src = data.fotoUrl;

        listarTelefones(data.telefone);

    } catch (err) {
        console.error(err);
    }
}

function listarTelefones(telefones) {
    listaTelefones.innerHTML = "";

    telefones.forEach(tel => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${tel.numero}
            <button class="btn-editar btn-tel" data-id="${tel.id}" data-num="${tel.numero}">Editar</button>
            <button class="btn-excluir btn-tel-del" data-id="${tel.id}">Excluir</button>
        `;
        listaTelefones.appendChild(li);
    });

    document.querySelectorAll(".btn-tel").forEach(btn =>
        btn.addEventListener("click", abrirModalEditarTelefone)
    );

    document.querySelectorAll(".btn-tel-del").forEach(btn =>
        btn.addEventListener("click", abrirModalExcluirTelefone)
    );
}

// === MODAL EDITAR TELEFONE ===
function abrirModalEditarTelefone(e) {
    telefoneEdicaoId = e.target.dataset.id;
    inputTel.value = e.target.dataset.num;
    tituloTel.textContent = "Editar Telefone";
    modalTel.classList.remove("hidden");
}

// === MODAL EXCLUIR TELEFONE ===
function abrirModalExcluirTelefone(e) {
    telefoneEdicaoId = e.target.dataset.id;
    modalExcluirTel.classList.remove("hidden");
}

// === BOTÃO CONFIRMAR EXCLUSÃO ===
btnConfirmDelTel.onclick = async () => {
    await axios.delete(`${API_URL}/telefones/${telefoneEdicaoId}`, config);
    fecharModais();
    carregarDados();
};

// === SALVAR EDIÇÃO / NOVO TELEFONE ===
btnSalvarTel.onclick = async () => {
    if (!inputTel.value.trim()) return;

    if (telefoneEdicaoId) {
        await axios.patch(`${API_URL}/telefones/${telefoneEdicaoId}`, {
            numero: inputTel.value,
            usuarioId: usuario.id
        }, config);
    } else {
        await axios.post(`${API_URL}/telefones`, {
            numero: inputTel.value,
            usuarioId: usuario.id
        }, config);
    }

    fecharModais();
    carregarDados();
};

// === ADICIONAR NOVO TELEFONE ===
btnAddTelefone.onclick = () => {
    telefoneEdicaoId = null;
    inputTel.value = "";
    tituloTel.textContent = "Adicionar Telefone";
    modalTel.classList.remove("hidden");
};

function fecharModais() {
    modalTel.classList.add("hidden");
    modalExcluirTel.classList.add("hidden");
}

// === FOTO ===
fotoInput.onchange = e => {
    previewFoto.src = URL.createObjectURL(e.target.files[0]);
};

// === EDITAR CONTA ===
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

btnSalvar.onclick = async (e) => {
    e.preventDefault();

    await axios.patch(`${API_URL}/usuarios/${usuario.id}`, {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
        senha: senha.value || undefined
    }, config);

    btnCancelar.click();
};

// === EXCLUIR CONTA ===
const modal = document.getElementById("modal-excluir");
document.getElementById("abrir-modal-excluir").onclick = () => modal.classList.remove("hidden");
document.getElementById("cancelar-excluir").onclick = () => modal.classList.add("hidden");
document.getElementById("confirmar-excluir").onclick = async () => {
    await axios.delete(`${API_URL}/usuarios/${usuario.id}`, config);
    localStorage.clear();
    window.location.href = "../login.html";
};

carregarDados();