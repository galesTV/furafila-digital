const adminNameElement = document.querySelector(".admin-name");
const nomeSalvo = localStorage.getItem("adminNome");

if (nomeSalvo) {
  adminNameElement.textContent = `Olá, ${nomeSalvo}`;
}

const tabelaPedidos = document.querySelector(".admin-table tbody");

async function carregarPedidos() {
  try {
    const response = await fetch(`http://localhost:3000/orders/admin/all`);

    if (!response.ok) {
      throw new Error("Erro ao buscar pedidos");
    }

    const pedidos = await response.json();

    tabelaPedidos.innerHTML = "";

    if (pedidos.length === 0) {
      tabelaPedidos.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;">
            Nenhum pedido ativo encontrado.
          </td>
        </tr>
      `;
      return;
    }

    pedidos.forEach((pedido) => {
      const nomesProdutos = pedido.itens
        .map((item) => `${item.nome} (${item.quantidade}x)`)
        .join(", ");

      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${pedido.nome_usuario}</td>
        <td>${nomesProdutos}</td>
        <td>R$ ${Number(pedido.total_pedido).toFixed(2)}</td>
        <td>${pedido.status_pedido}</td>
        <td>${new Date(pedido.data_pedido).toLocaleTimeString("pt-BR")}</td>
        <td>${new Date(pedido.data_pedido).toLocaleDateString("pt-BR")}</td>
        <td>${pedido.forma_pagamento}</td>
      `;

      tabelaPedidos.appendChild(linha);
    });
  } catch (error) {
    console.error(error);

    tabelaPedidos.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color:red;">
          Erro ao carregar pedidos.
        </td>
      </tr>
    `;
  }
}

carregarPedidos();

setInterval(carregarPedidos, 5000);

const btnToggle = document.getElementById("toggle-dark");
btnToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
