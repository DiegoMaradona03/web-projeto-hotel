import axios from "https://cdn.skypack.dev/axios";

const API_URL = "https://api-projeto-hotel.vercel.app"; // URL da sua API
const container = document.querySelector('.quartos-container'); // container real no HTML

// ==== 1. Buscar quartos e renderizar ====
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
      const reservado = q.reservas && q.reservas.length > 0;
      const div = document.createElement("div");
      div.classList.add("quarto");
      if (reservado) div.classList.add("indisponivel");

      div.innerHTML = `
        <img src="${q.foto || '../images/sem-imagem.png'}" alt="Quarto ${q.numero}">
        <div class="info">
          <h2>${q.nome || "Quarto " + q.numero}</h2>
          <p>${q.descricao}</p>
          <p><strong>Máx. hóspedes:</strong> ${q.totalOspedes || "Não informado"}</p>
          ${
            reservado
              ? `<button class="button-v2" disabled>Indisponível</button>`
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
    const id = e.target.dataset.id;
    abrirFormularioReserva(id);
  }
});

function abrirFormularioReserva(idQuarto) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal-form">
      <h2>Agendar Reserva</h2>
      <label>Data de Entrada:</label>
      <input type="date" id="dataEntrada">
      <label>Data de Saída:</label>
      <input type="date" id="dataSaida">
      <label>Quantidade de Hóspedes:</label>
      <input type="number" id="qtdHospedes" min="1">
      <button class="button-v2" id="ir-pagamento">Ir para Pagamento</button>
      <button class="button-v2 cancelar-btn">Cancelar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".cancelar-btn").onclick = () => overlay.remove();
  overlay.querySelector("#ir-pagamento").onclick = () => {
    const entrada = document.getElementById("dataEntrada").value;
    const saida = document.getElementById("dataSaida").value;
    const qtd = document.getElementById("qtdHospedes").value;
    if (!entrada || !saida || !qtd) return alert("Preencha todos os campos!");
    overlay.remove();
    abrirFormularioPagamento(idQuarto, entrada, saida, qtd);
  };
}

// ==== 3. Abrir modal de pagamento ====
function abrirFormularioPagamento(idQuarto, entrada, saida, qtd) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  overlay.innerHTML = `
    <div class="modal-form">
      <h2>Pagamento</h2>
      <input type="text" placeholder="Nome no cartão" required>
      <input type="text" placeholder="Número do cartão" required>
      <input type="text" placeholder="Validade (MM/AA)" required>
      <input type="text" placeholder="CVV" required>
      <button class="button-v2 confirmar-pagamento" data-id="${idQuarto}">Confirmar</button>
      <button class="button-v2 cancelar-btn">Cancelar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".cancelar-btn").onclick = () => overlay.remove();

  overlay.querySelector(".confirmar-pagamento").onclick = async (e) => {
    const id = e.target.dataset.id;
    try {
      await axios.post(
        `${API_URL}/reservas`,
        {
          usuarioId: usuario.id, // pegando do verificacao.js
          quartoId: Number(id),
          dataEntradaPrevista: entrada,
          dataSaidaPrevista: saida,
          quantidadeOspedes: Number(qtd),
        },
        { headers: { Authorization: `Bearer ${usuario.token}` } }
      );
      alert("Reserva realizada com sucesso!");
      overlay.remove();
      carregarQuartos();
    } catch (error) {
      console.error(error);
      alert("Erro ao confirmar pagamento ou reserva.");
    }
  };
}

carregarQuartos();