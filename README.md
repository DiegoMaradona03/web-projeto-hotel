# 🧪 Roteiro de Testes do Front-End — Projeto Hotel

Este documento descreve o **passo a passo completo** para testar o front-end do projeto **[Projeto-Hotel](https://github.com/ArthurS0/Projeto-Hotel)**.  
O objetivo é garantir que todas as funcionalidades da interface funcionem corretamente e que a experiência do usuário esteja de acordo com o esperado.  

---

## 🧰 1. Preparação / Pré-condições

Antes de iniciar os testes, certifique-se de:

- ✅ O repositório foi clonado localmente:
  ```bash
  git clone https://github.com/ArthurS0/Projeto-Hotel.git
  ```
- ✅ A branch que será testada está atualizada (main ou dev)
- ✅ O backend/API (se necessário) está rodando e acessível
- ✅ Você está usando um navegador compatível (Chrome, Firefox, Edge)
- ✅ Cache e cookies estão limpos (ou use uma aba anônima)
- ✅ Arquivo de entrada: abra `front/html/pagina_inicial.html` no navegador para iniciar o front-end

---

## 🌐 2. Testes de Navegação Básica

2.1 — Abrir `front/html/pagina_inicial.html`  
👉 Resultado Esperado: Página inicial carrega corretamente  [ ]

2.2 — Clicar nos itens do menu (🏨 Sobre, 📞 Contato, 📅 Reservas, 🖼️ Galeria)  
👉 Resultado Esperado: Cada link leva à seção correta  [ ]

2.3 — Redimensionar janela (mobile / tablet / desktop)  
👉 Resultado Esperado: Layout responsivo se adapta corretamente  [ ]

2.4 — Verificar imagens da galeria e banners  
👉 Resultado Esperado: Todas as imagens carregam sem erros  [ ]

2.5 — Conferir o rodapé e links externos  
👉 Resultado Esperado: Links funcionam e informações aparecem corretamente  [ ]

---

## 🏨 3. Testes de Reserva de Quartos

3.1 — Acessar página ou seção de Reservas  
👉 Resultado Esperado: Interface de reserva é exibida  [ ]

3.2 — Selecionar datas válidas (check-in / check-out)  
👉 Resultado Esperado: Sistema aceita e mostra valores  [ ]

3.3 — Selecionar tipo de quarto e quantidade  
👉 Resultado Esperado: Atualização do valor total ou resumo  [ ]

3.4 — Clicar em “Reservar”  
👉 Resultado Esperado: Confirmação ou feedback positivo exibido  [ ]

3.5 — Testar datas inválidas (check-out antes do check-in)  
👉 Resultado Esperado: Mensagem de erro exibida  [ ]

3.6 — Deixar campos obrigatórios vazios  
👉 Resultado Esperado: Front exibe alerta de obrigatoriedade  [ ]

---

## 💬 4. Testes de Avaliações e Contato

4.1 — Acessar seção de Avaliações
👉 Resultado Esperado: Campo de nota e comentário aparece  [ ]

4.2 — Enviar avaliação válida  
👉 Resultado Esperado: Feedback positivo exibido / comentário listado  [ ]

4.3 — Enviar avaliação inválida (sem nota ou texto)  
👉 Resultado Esperado: Mensagem de erro aparece  [ ]

4.4 — Acessar seção Contato  
👉 Resultado Esperado: Formulário aparece com nome, email e mensagem  [ ]

4.5 — Enviar mensagem válida  
👉 Resultado Esperado: Mensagem de sucesso exibida  [ ]

4.6 — Testar dados inválidos (email errado, mensagem vazia)  
👉 Resultado Esperado: Avisos de erro são exibidos  [ ]

---

## ⚙️ 5. Casos Extremos / Testes de Borda

5.1 — Reservar número excessivo de quartos (ex: 100)  
👉 Resultado Esperado: Mensagem de limite exibida  [ ]

5.2 — Inserir caracteres especiais em campos de texto  
👉 Resultado Esperado: Sistema ignora ou trata corretamente  [ ]

5.3 — Simular conexão lenta  
👉 Resultado Esperado: Indicadores de carregamento visíveis  [ ]

5.4 — Recarregar página durante uma reserva  
👉 Resultado Esperado: Estado da reserva é tratado corretamente  [ ]

5.5 — Simular backend fora do ar  
👉 Resultado Esperado: Mensagem de erro adequada no front  [ ]

---

## 🧹 6. Pós-Teste / Encerramento

- [ ] Conferir logs no backend para verificar requisições  
- [ ] Apagar dados fictícios inseridos (reservas ou contatos)  
- [ ] Limpar cache e histórico do navegador  
- [ ] Registrar bugs e capturas de tela dos erros encontrados  
- [ ] Atualizar planilha de resultados e status de aprovação  

---

## ✅ 7. Checklist Geral do Front-End

🧭 Navegação fluida entre páginas  [ ]

🖼️ Imagens e ícones carregam corretamente  [ ]

📱 Layout responsivo em diferentes tamanhos de tela  [ ]

📝 Formulários validam campos obrigatórios  [ ]

💬 Sistema de avaliações funciona  [ ]

📞 Formulário de contato envia mensagens  [ ]

⚠️ Mensagens de erro claras e amigáveis  [ ]

🔄 Página se comporta bem ao recarregar  [ ]

🧩 Nenhum elemento “quebrado” no layout  [ ]

---

## 🧾 8. Sugestão de Ordem de Execução

1. Preparar ambiente (pré-condições)  
2. Testar navegação e layout  
3. Executar reservas válidas e inválidas  
4. Testar formulários (contato e avaliações)  
5. Verificar fluxo de pagamento (se ativo)  
6. Executar casos extremos / falhas simuladas  
7. Encerrar testes e documentar resultados  

---

## 🧠 Dica

Durante os testes, tire **screenshots** ou **grave a tela** para facilitar a identificação de bugs.  
Você também pode usar uma planilha com as colunas:

```
Caso de Teste | Resultado Esperado | Resultado Obtido | Status | Observações
```

---

📅 **Última atualização:** Dezembro de 2025  
👨‍💻 **Autor:** Arthur Souza  
📦 **Repositório:** [github.com/ArthurS0/Projeto-Hotel](https://github.com/ArthurS0/Projeto-Hotel)