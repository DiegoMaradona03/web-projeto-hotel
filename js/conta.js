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

        if (data.fotoUrl) {
            previewFoto.classList.remove("default");
            previewFoto.innerHTML = `<img src="${data.fotoUrl}" alt="Foto do perfil">`;
        } else {
            previewFoto.classList.add("default");
            previewFoto.innerHTML = `<i class="fas fa-user"></i>`;
        }

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
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const preview = document.getElementById("preview-foto");

    preview.classList.remove("default");
    preview.innerHTML = `<img src="${url}" alt="Foto de perfil">`;
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
    window.location.href = "login.html";
};

let scale = 1;
let baseScale = 1;
let posX = 0;
let posY = 0;

let dragging = false;
let startX = 0;
let startY = 0;

// Touch
let lastTouchDistance = 0;
let lastTouchX = 0;
let lastTouchY = 0;

const modalCrop = document.getElementById("modal-crop");
const cropImage = document.getElementById("crop-image");
const zoomRange = document.getElementById("zoom-range");
const area = document.querySelector(".crop-area");

// Quando escolhe a foto
fotoInput.addEventListener("click", () => {
  fotoInput.value = "";
});

fotoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    cropImage.src = reader.result;
    modalCrop.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

// Quando a imagem carrega
cropImage.onload = () => {
  const areaSize = area.clientWidth;

  const imgW = cropImage.naturalWidth || 1;
  const imgH = cropImage.naturalHeight || 1;

  // Escala mínima = cobrir o círculo
  baseScale = Math.max(areaSize / imgW, areaSize / imgH);

  // Sem zoom forçado
  scale = baseScale;
  zoomRange.value = 1;

  posX = 0;
  posY = 0;

  updateTransform();
};

// ============ MOUSE DRAG ============

cropImage.addEventListener("mousedown", (e) => {
  dragging = true;
  cropImage.style.cursor = "grabbing";
  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  moveImage(e.clientX, e.clientY);
});

window.addEventListener("mouseup", () => {
  dragging = false;
  cropImage.style.cursor = "grab";
});

// ============ TOUCH (CELULAR) ============

cropImage.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    const t = e.touches[0];
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
  }

  if (e.touches.length === 2) {
    lastTouchDistance = getTouchDistance(e.touches);
  }
}, { passive: false });

cropImage.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (e.touches.length === 1) {
    const t = e.touches[0];
    const dx = t.clientX - lastTouchX;
    const dy = t.clientY - lastTouchY;

    posX += dx;
    posY += dy;

    lastTouchX = t.clientX;
    lastTouchY = t.clientY;

    limitPosition();
    updateTransform();
  }

  if (e.touches.length === 2) {
    const dist = getTouchDistance(e.touches);
    const diff = dist - lastTouchDistance;

    scale += diff * 0.003;

    if (scale < baseScale) scale = baseScale;
    if (scale > 3) scale = 3;

    lastTouchDistance = dist;

    limitPosition();
    updateTransform();
  }
}, { passive: false });

// Medir distância entre dois toques (pinch zoom)
function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// ============ ZOOM (SLIDER) ============

zoomRange.addEventListener("input", () => {
  const zoomValue = parseFloat(zoomRange.value);
  scale = baseScale * zoomValue;

  limitPosition();
  updateTransform();
});

// ============ CONTROLE DE MOVIMENTO ============

function moveImage(x, y) {
  posX = x - startX;
  posY = y - startY;

  limitPosition();
  updateTransform();
}

function limitPosition() {
  const areaSize = area.clientWidth;

  const imgW = cropImage.naturalWidth * scale;
  const imgH = cropImage.naturalHeight * scale;

  const limitX = (imgW - areaSize) / 2;
  const limitY = (imgH - areaSize) / 2;

  if (posX > limitX) posX = limitX;
  if (posX < -limitX) posX = -limitX;

  if (posY > limitY) posY = limitY;
  if (posY < -limitY) posY = -limitY;
}

function updateTransform() {
  cropImage.style.transform = `
    translate(-50%, -50%)
    translate(${posX}px, ${posY}px)
    scale(${scale})
  `;
}

// ============ BOTÕES ==================

// Cancelar
document.getElementById("cancelar-crop").onclick = () => {
  modalCrop.classList.add("hidden");
};

// Confirmar recorte real
document.getElementById("confirmar-crop").onclick = () => {
  const outputSize = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Máscara circular
  ctx.beginPath();
  ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
  ctx.clip();

  const displaySize = area.clientWidth;

  const imgW = cropImage.naturalWidth;
  const imgH = cropImage.naturalHeight;

  // quanto da imagem aparece na tela
  const visibleW = displaySize / scale;
  const visibleH = displaySize / scale;

  const sx = (imgW / 2 - visibleW / 2) - (posX / scale);
  const sy = (imgH / 2 - visibleH / 2) - (posY / scale);

  ctx.drawImage(
    cropImage,
    sx, sy,
    visibleW, visibleH,
    0, 0,
    outputSize, outputSize
  );

  const final = canvas.toDataURL("image/webp", 1);

  previewFoto.innerHTML = `<img src="${final}">`;
  previewFoto.classList.remove("default");

  // Guarda a imagem recortada pro envio real depois
  previewFoto.dataset.finalImage = final;

  modalCrop.classList.add("hidden");
};

carregarDados();