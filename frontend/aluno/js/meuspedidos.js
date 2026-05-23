document.addEventListener("DOMContentLoaded", async () => {
  const listaPedidos = document.getElementById("lista-pedidos");
  const alunoId = localStorage.getItem("alunoId");
  const alunoNome = localStorage.getItem("alunoNome");

  if (alunoNome) {
    const saudacao = document.getElementById("saudacao-nome");
    if (saudacao) saudacao.innerText = `Olá, ${alunoNome}`;
  }

  if (!alunoId) {
    listaPedidos.innerHTML =
      "<p class='loader'>Erro: Usuário não identificado. Faça login novamente.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://furafila-digital.onrender.com/orders/my-orders/${alunoId}`,
    );

    if (!response.ok) throw new Error("Erro ao buscar pedidos");

    const pedidos = await response.json();

    if (pedidos.length === 0) {
      listaPedidos.innerHTML = `
        <div class="vazio">
            <p>Você ainda não realizou nenhum pedido.</p>
            <br>
            <a href="menualuno.html" class="btn-voltar">Ir para o Cardápio</a>
        </div>`;
      return;
    }

    listaPedidos.innerHTML = pedidos
      .map((pedido) => {
        const dataFormatada = new Date(pedido.data_pedido).toLocaleString(
          "pt-BR",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        );

        const statusClasse = `status-${pedido.status_pedido.toLowerCase()}`;

        return `
            <div class="card-pedido ${statusClasse}">
                <div class="info-principal">
                    <h3>Pedido #${pedido.id_pedido}</h3>
                    <p>Realizado em: ${dataFormatada}</p>
                </div>
                <div class="detalhes-pagamento">
                    <span class="valor-total">R$ ${parseFloat(pedido.total_pedido).toFixed(2).replace(".", ",")}</span>
                    <small>Pagamento: ${pedido.forma_pagamento.toUpperCase()}</small>
                </div>
                <span class="status-badge">${pedido.status_pedido}</span>
            </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Erro:", error);
    listaPedidos.innerHTML =
      "<p class='loader'>Não foi possível carregar seu histórico no momento.</p>";
  }
});
const btnDark = document.getElementById("toggle-dark");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  if (btnDark) btnDark.innerHTML = "☀️";
}

if (btnDark) {
  btnDark.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      btnDark.innerHTML = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      btnDark.innerHTML = "🌙";
    }
  });
}
