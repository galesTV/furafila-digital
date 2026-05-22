document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrinho();
  exibirPerfil();
});

function exibirPerfil() {
  const nomeSalvo = localStorage.getItem("alunoNome");

  if (nomeSalvo) {
    const saudacaoTopo = document.querySelector("#topo p");
    if (saudacaoTopo) saudacaoTopo.innerText = `Olá, ${nomeSalvo}`;

    const perfilNome = document.querySelector(".perfil-aluno p strong");
    if (perfilNome && perfilNome.nextSibling) {
      perfilNome.nextSibling.textContent = ` ${nomeSalvo}`;
    }
  }
}

function renderizarCarrinho() {
  const listaProdutos = document.getElementById("lista-produtos");
  const valorTotalElemento = document.getElementById("valor-total");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  listaProdutos.innerHTML = "";

  if (carrinho.length === 0) {
    listaProdutos.innerHTML =
      "<p style='text-align:center; padding:20px;'>Seu carrinho está vazio.</p>";
    valorTotalElemento.innerText = "R$ 0,00";
    return;
  }

  let totalGeral = 0;

  carrinho.forEach((produto, index) => {
    const subtotal = produto.preco * produto.qtd;
    totalGeral += subtotal;

    const itemHTML = `
            <div class="item-cart">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="item-info">
                    <h4>${produto.nome}</h4>
                    <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
                </div>
                <div class="controles-qtd">
                    <button onclick="alterarQuantidade(${index}, -1)">-</button>
                    <span>${produto.qtd}</span>
                    <button onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
                <span class="subtotal-item">R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
        `;
    listaProdutos.insertAdjacentHTML("beforeend", itemHTML);
  });

  valorTotalElemento.innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

window.alterarQuantidade = (index, delta) => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho"));

  carrinho[index].qtd += delta;

  if (carrinho[index].qtd < 1) {
    carrinho.splice(index, 1);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
};

window.finalizarPedido = async () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  const alunoId = localStorage.getItem("alunoId");
  const metodoPagamento = document.querySelector(
    'input[name="pagamento"]:checked',
  ).value;

  if (!alunoId || alunoId === "undefined") {
    alert(
      "Sessão expirada ou usuário não identificado. Por favor, faça login novamente.",
    );
    window.location.href = "loginaluno.html";
    return;
  }

  if (!carrinho || carrinho.length === 0) {
    alert("O seu carrinho está vazio!");
    return;
  }

  if (!metodoPagamento) {
    alert("Selecione uma forma de pagamento!");
    return;
  }

  const totalGeral = carrinho.reduce(
    (acc, item) => acc + item.preco * item.qtd,
    0,
  );

  const dadosPedido = {
    usuario_id: parseInt(alunoId),
    total_pedido: totalGeral,
    forma_pagamento: metodoPagamento,
    itens: carrinho,
  };

  try {
    const response = await fetch("http://localhost:3000/orders/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosPedido),
    });

    const resultado = await response.json();

    if (response.ok) {
      alert("Pedido #" + resultado.pedidoId + " enviado com sucesso!");
      localStorage.removeItem("carrinho"); // Limpa o carrinho
      window.location.href = "meuspedidos.html"; // Volta para o início
    } else {
      alert("Erro: " + resultado.message);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
  }
};
const btnDark = document.getElementById('toggle-dark');
const body = document.body;

// Verifica se o modo escuro estava ativo
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    btnDark.innerHTML = '☀️';
}

btnDark.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        btnDark.innerHTML = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        btnDark.innerHTML = '🌙';
    }
});

document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("alunoNome");
  localStorage.removeItem("carrinho");

  alert("Sessão encerrada!");
  window.location.href = "loginaluno.html";
});
