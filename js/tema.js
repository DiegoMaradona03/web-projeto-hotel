// tema.js
(function() {
  const temas = {
    vermelho: "../css/colors.css/cor1.css",
    azul: "../css/colors.css/cor2.css",
    verde: "../css/colors.css/cor3.css",
    rosa: "../css/colors.css/cor4.css",
    pretoebranco: "../css/colors.css/cor5.css"
  };

  function aplicarTema(nomeTema) {
    const linkCor = document.getElementById("temadapag");
    if (!linkCor) return;
    linkCor.href = temas[nomeTema] || temas.vermelho;

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.email) {
      localStorage.setItem(`temaUsuario_${usuario.email}`, nomeTema);
    }
  }

  // Aplica imediatamente se usuário logado
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (usuario?.email) {
    const temaSalvo = localStorage.getItem(`temaUsuario_${usuario.email}`) || "vermelho";
    aplicarTema(temaSalvo);
  }

  // Botões de tema
  document.addEventListener("click", e => {
    const btn = e.target.closest(".config-botao.tema");
    if (!btn) return;
    aplicarTema(btn.dataset.cor);
  });

  // Logout
  document.addEventListener("click", e => {
    const logout = e.target.closest(".logout");
    if (!logout) return;
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.email) {
      localStorage.removeItem(`temaUsuario_${usuario.email}`);
    }
    aplicarTema("vermelho");
  });
})();