import axios from "https://cdn.skypack.dev/axios";

const API_URL = "https://api-projeto-hotel.vercel.app";
const container = document.querySelector(".quartos-container");
const usuario = JSON.parse(localStorage.getItem("usuario"));
let modalAberto = false;

// ================================================================
// 1. CARREGAR APENAS AS RESERVAS DO USUÁRIO LOGADO
// ================================================================
async function carregarReservas() {
  container.innerHTML = "<p>Carregando suas reservas...</p>";

  try {
    const resp = await axios.get(`${API_URL}/reservas`);
    const todasReservas = resp.data;

    // 🔍 Filtrar apenas reservas do usuário logado
    const minhasReservas = todasReservas.filter(r => r.usuarioId === usuario.id);

    container.innerHTML = `
      <h1>Quartos que você reservou</h1>
    `;

    if (minhasReservas.length === 0) {
      container.innerHTML += `
        <p style="
          font-size:1.3rem; 
          margin-top:1.5rem; 
          color:var(--p2);
        ">Você ainda não fez nenhuma reserva.</p>
      `;
      return;
    }

    // =============================
    // Para cada reserva, buscar o quarto correspondente
    // =============================
    for (const reserva of minhasReservas) {
      const quartoResp = await axios.get(`${API_URL}/quartos/${reserva.quartoId}`);
      const q = quartoResp.data;

      const div = document.createElement("div");
      div.classList.add("quarto");

      div.innerHTML = `
        <img src="${q.foto || "../images/sem-imagem.png"}" alt="Quarto ${q.numero}">
        
        <div class="info">
          <h2>${q.nome || `Quarto ${q.numero}`}</h2>

          <p>${q.descricao}</p>
          <p><strong>Máx. hóspedes:</strong> ${q.quantidadeOspedes || q.quantidadeOspedes === 0 ? q.quantidadeOspedes : "Não informado"}</p>
          <p><strong>Diária:</strong> R$ ${Number(q.diaria).toFixed(2)}</p>
          <p><strong>Entrada prevista:</strong> ${new Date(new Date(reserva.dataEntradaPrevista).getTime() + (1000 * 60 * 60 * 24)).toLocaleDateString()}</p>
          <p><strong>Saída prevista:</strong> ${new Date(new Date(reserva.dataSaidaPrevista).getTime() + (1000 * 60 * 60 * 24)).toLocaleDateString()}</p>
          <button class="button-v2 cancelar-reserva-btn" data-id="${reserva.id}">Cancelar Reserva</button>
        </div>
      `;
      container.appendChild(div);
    }

  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <p style="color:red; font-size:1.2rem;">Erro ao carregar reservas.</p>
    `;
  }
}

// ================================================================
// 2. CANCELAR RESERVA COM MODAL
// ================================================================

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("reservar-btn")) {
    if (modalAberto) return;
    const id = e.target.dataset.id;
    abrirFormularioReserva(id);
  }

  if (e.target.classList.contains("cancelar-reserva-btn")) {
    const reservaId = e.target.dataset.id;
    cancelarReserva(reservaId);
  }
});

async function cancelarReserva(idReserva) {
  if (modalAberto) return;
  modalAberto = true;

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal-form">
      <span class="close">&times;</span>
      <h2>Cancelar Reserva</h2>
      <p style="font-size:1.2rem; color:var(--p2); margin-bottom:1rem;">
        Tem certeza que deseja cancelar esta reserva?
      </p>
      <div style="display:flex; gap:1rem; width:100%;">
        <button class="button-v2 confirmar-cancelamento" style="flex:1;">Sim, cancelar</button>
        <button class="button-v2 cancelar-btn" style="flex:1;">Não, voltar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const fecharModal = () => {
    overlay.remove();
    modalAberto = false;
  };

  overlay.querySelector(".close").onclick = fecharModal;
  overlay.querySelector(".cancelar-btn").onclick = fecharModal;

  overlay.querySelector(".confirmar-cancelamento").onclick = async () => {
    try {
      await axios.delete(`${API_URL}/reservas/${idReserva}`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });
      overlay.remove();
      modalAberto = false;
      carregarReservas();
    } catch (error) {
      console.error(error);
    }
  };
}

// ================================================================
// 3. INICIALIZAR
// ================================================================
carregarReservas();
