const adminNameElement = document.querySelector(".admin-name");
const nomeSalvo = localStorage.getItem("adminNome");

if (nomeSalvo) {
  adminNameElement.textContent = `Olá, ${nomeSalvo}`;
}

const btnToggle = document.getElementById("toggle-dark");
btnToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  btnToggle.textContent = document.body.classList.contains("dark-mode")
    ? "Modo Claro"
    : "Modo Escuro";
});

let todosOsPedidos = [];

document.addEventListener("DOMContentLoaded", () => {
  carregarPedidos();
  configurarFiltros();
  setInterval(carregarPedidos, 30000);
});

async function carregarPedidos() {
  try {
    const response = await fetch("https://furafila-digital.onrender.com/orders/admin/all");
    todosOsPedidos = await response.json();
    renderizarTabela(todosOsPedidos);
    atualizarContadores();
  } catch (error) {
    console.error("Erro ao carregar painel:", error);
  }
}

function renderizarTabela(pedidosParaExibir) {
  const tabelaBody = document.querySelector(".tabela-pedidos tbody");
  tabelaBody.innerHTML = "";

  pedidosParaExibir.forEach((pedido) => {
    const tr = document.createElement("tr");
    const listaItens = pedido.itens
      .map((i) => `${i.quantidade}x ${i.nome}`)
      .join(", ");
    const hora = new Date(pedido.data_pedido).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    tr.innerHTML = `
        <td>#${pedido.id_pedido}</td>
        <td>${pedido.nome_usuario}</td>
        <td>${listaItens}</td>
        <td>
            <select onchange="alterarStatus(${pedido.id_pedido}, this.value)" class="status-select">
                <option value="Pendente" ${pedido.status_pedido === "Pendente" ? "selected" : ""}>Pendente</option>
                <option value="Preparando" ${pedido.status_pedido === "Preparando" ? "selected" : ""}>Preparando</option>
                <option value="Pronto" ${pedido.status_pedido === "Pronto" ? "selected" : ""}>Pronto</option>
            </select>
        </td>
        <td>${hora}</td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function configurarFiltros() {
  const filtros = document.querySelectorAll(".tag");
  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      const tipoFiltro = filtro.getAttribute("data-filter");

      if (tipoFiltro === "Todos") {
        renderizarTabela(todosOsPedidos);
      } else {
        const filtrados = todosOsPedidos.filter(
          (p) => p.status_pedido === tipoFiltro,
        );
        renderizarTabela(filtrados);
      }

      filtros.forEach((f) => (f.style.border = "none"));
      filtro.style.border = "2px solid #4b0082";
    });
  });
}

function atualizarContadores() {
  document.querySelector(".tag-todos").innerText =
    `Todos (${todosOsPedidos.length})`;
  document.querySelector(".tag-pendentes").innerText =
    `Pendentes (${todosOsPedidos.filter((p) => p.status_pedido === "Pendente").length})`;
  document.querySelector(".tag-preparando").innerText =
    `Preparando (${todosOsPedidos.filter((p) => p.status_pedido === "Preparando").length})`;
  document.querySelector(".tag-pronto").innerText =
    `Pronto (${todosOsPedidos.filter((p) => p.status_pedido === "Pronto").length})`;
}

async function alterarStatus(id_pedido, novo_status) {
  try {
    const response = await fetch(
      "https://furafila-digital.onrender.com/orders/admin/update-status",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_pedido, novo_status }),
      },
    );

    if (response.ok) {
      carregarPedidos();
    } else {
      console.error("Erro status:", response.status);
      alert("Erro ao atualizar. Verifique o console.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
