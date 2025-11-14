import axios from "https://cdn.skypack.dev/axios";

const API_URL = "https://api-projeto-hotel.vercel.app";
const container = document.querySelector(".quartos-container");
const usuario = JSON.parse(localStorage.getItem("usuario"));
let modalAberto = false;

// ==== Função auxiliar para mensagens ====
function mostrarMensagem(texto, tipo = "sucesso") {
  const msg = document.createElement("div");
  msg.className = `mensagem ${tipo}`;
  msg.textContent = texto;
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("visivel");
  }, 10);

  setTimeout(() => {
    msg.classList.remove("visivel");
    setTimeout(() => msg.remove(), 300);
  }, 3000);
}

// ==== 1. Buscar e renderizar quartos ====
async function carregarQuartos() {
  container.innerHTML = "<p>Carregando quartos...</p>";

  try {
    const resp = await axios.get(`${API_URL}/quartos`);
    const quartos = resp.data;

    container.innerHTML = "";

    if (quartos.length === 0) {
      container.innerHTML = `<p style="font-size:1.25rem; color:var(--p3); margin-top:2rem;">
        Nenhum quarto cadastrado ainda.
      </p>`;
      return;
    }

    quartos.forEach((q) => {
      const reservaDoUsuario = q.reservas && q.reservas.find(r => r.usuarioId === usuario.id);
      const reservaAtiva = q.reservas && q.reservas.length > 0 ? q.reservas[0] : null;

      const div = document.createElement("div");
      div.classList.add("quarto");
      if (q.reservas && q.reservas.length > 0 && !reservaDoUsuario) {
        div.classList.add("indisponivel");
      }
      div.innerHTML = `
        <img src="${q.foto || "../images/sem-imagem.png"}" alt="Quarto ${q.numero}">
        <div class="info">
          <h2>${q.nome || "Quarto " + q.numero}</h2>
          <p>${q.descricao}</p>
          <p><strong>Máx. hóspedes:</strong> ${q.totalOspedes || "Não informado"}</p>
          <p><strong>Diária:</strong> R$ ${Number(q.diaria).toFixed(2)}</p>
            ${reservaAtiva && !reservaDoUsuario ?
          `<p class="disponivel-em">
              <strong>Disponível novamente em:</strong><br>
                ${new Date(reservaAtiva.dataSaidaPrevista).toLocaleDateString("pt-BR")}
              </p>`
          : ""
        }
          ${reservaDoUsuario
          ? `<button class="button-v2 cancelar-reserva-btn" data-id="${reservaDoUsuario.id}">Cancelar Reserva</button>`
          : q.reservas && q.reservas.length > 0
            ? `<button class="button-v2" disabled>Quarto já reservado</button>`
            : `<button class="button-v2 reservar-btn" data-id="${q.id}">Agendar Reserva</button>`
        }
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Erro ao carregar quartos.</p>";
  }
}

// ==== 2. Abrir modal de reserva ====
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

function abrirFormularioReserva(idQuarto) {
  modalAberto = true;

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal-form">
      <span class="close">&times;</span>
      <h2>Agendar Reserva</h2>
      <label>Data de Entrada:</label>
      <input type="date" id="dataEntradaPrevista">
      <label>Data de Saída:</label>
      <input type="date" id="dataSaidaPrevista">
      <button class="button-v2 confirmar-reserva" data-id="${idQuarto}">Confirmar Reserva</button>
      <button class="button-v2 cancelar-btn">Cancelar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".cancelar-btn").onclick = () => {
    overlay.remove();
    modalAberto = false;
  };
  overlay.querySelector(".close").onclick = () => {
    overlay.remove();
    modalAberto = false;
  };

  overlay.querySelector(".confirmar-reserva").onclick = async () => {
    const entradaPrev = document.getElementById("dataEntradaPrevista").value;
    const saidaPrev = document.getElementById("dataSaidaPrevista").value;

    if (!entradaPrev || !saidaPrev) {
      mostrarMensagem("Preencha as datas de entrada e saída!", "erro");
      return;
    }

    try {
      const data = {
        usuarioId: Number(usuario.id),
        quartoId: Number(idQuarto),
        dataEntradaPrevista: new Date(entradaPrev),
        dataSaidaPrevista: new Date(saidaPrev)
      }
      const options = {
        method: 'POST',
        url: `${API_URL}/reservas`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usuario.token}`
        },
        data: data
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

      mostrarMensagem("Reserva realizada com sucesso!");
      overlay.remove();
      modalAberto = false;
      carregarQuartos();
    } catch (error) {
      console.error(error);
      mostrarMensagem("Erro ao criar reserva.", "erro");
    }
  };
}

// ==== 3. Cancelar reserva ====
async function cancelarReserva(idReserva) {
  if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;

  try {
    await axios.delete(`${API_URL}/reservas/${idReserva}`, {
      headers: { Authorization: `Bearer ${usuario.token}` },
    });
    mostrarMensagem("Reserva cancelada com sucesso!");
    carregarQuartos();
  } catch (error) {
    console.error(error);
    mostrarMensagem("Erro ao cancelar reserva.", "erro");
  }
}

// ==== Inicialização ====
carregarQuartos();