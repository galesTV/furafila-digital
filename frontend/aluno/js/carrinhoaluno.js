document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrinho();
});

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
  const metodoPagamento = document.querySelector(
    'input[name="pagamento"]:checked',
  ).value;

  if (!carrinho || carrinho.length === 0) {
    alert("O seu carrinho está vazio!");
    return;
  }

  const pedido = {
    alunoId: 1,
    itens: carrinho,
    pagamento: metodoPagamento,
    total: carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0),
  };

  console.log("Enviando pedido ao servidor:", pedido);

  try {
    alert("Simulação: Pedido enviado com sucesso via " + metodoPagamento);
  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
  }
};
