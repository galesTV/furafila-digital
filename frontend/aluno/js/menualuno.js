document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error("Erro ao carregar os produtos");
    }
    const produtos = await response.json();

    const salgadosContainer = document.getElementById("salgados-container");
    const docesContainer = document.getElementById("doces-container");
    const bebidasContainer = document.getElementById("bebidas-container");
    const modalsContainer = document.getElementById("modals-container");

    salgadosContainer.innerHTML = "";
    docesContainer.innerHTML = "";
    bebidasContainer.innerHTML = "";
    modalsContainer.innerHTML = "";

    produtos.forEach((produto, index) => {
      const idBtn = `Abrir${produto.id || index + 1}`;
      const idModal = `Modal${produto.id || index + 1}`;
      const idFechar = `fechar${produto.id || index + 1}`;

      const productCardHTML = `
                <button id="${idBtn}" class="product-btn">
                    <img src="http://localhost:3000${produto.imagem}" alt="${produto.nome}" onerror="this.src='../images/placeholder.png'">
                    <div>
                        <h4>${produto.nome}</h4>
                        <p>R$ ${parseFloat(produto.preco).toFixed(2).replace(".", ",")}</p>
                    </div>
                </button>
            `;

      const modalHTML = `
                <div id="${idModal}" class="modal">
                    <div class="modal-content">
                        <span class="${idFechar}">&times;</span>
                        <center>
                            <h2>${produto.nome}</h2>
                            <hr>
                            <p>${produto.descricao || "Sem descrição disponível."}</p>
                            <p><strong>R$ ${parseFloat(produto.preco).toFixed(2).replace(".", ",")}</strong></p>
                        </center>
                    </div>
                </div>
            `;

      if (produto.categoria === "Salgados") {
        salgadosContainer.insertAdjacentHTML("beforeend", productCardHTML);
      } else if (produto.categoria === "Doces") {
        docesContainer.insertAdjacentHTML("beforeend", productCardHTML);
      } else if (produto.categoria === "Bebidas") {
        bebidasContainer.insertAdjacentHTML("beforeend", productCardHTML);
      }

      modalsContainer.insertAdjacentHTML("beforeend", modalHTML);

      setTimeout(() => {
        const btn = document.getElementById(idBtn);
        const modal = document.getElementById(idModal);
        const span = document.querySelector(`.${idFechar}`);

        if (btn && modal && span) {
          btn.onclick = () => {
            modal.style.display = "block";
          };

          span.onclick = () => {
            modal.style.display = "none";
          };

          window.onclick = (event) => {
            if (event.target === modal) {
              modal.style.display = "none";
            }
          };
        }
      }, 0);
    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
      const filter = e.target.value.toLowerCase();
      const buttons = document.querySelectorAll(".product-row button");
      buttons.forEach((btn) => {
        const name = btn.querySelector("h4").textContent.toLowerCase();
        if (name.includes(filter)) {
          btn.style.display = "";
        } else {
          btn.style.display = "none";
        }
      });
    });
  } catch (error) {
    console.error("Erro ao inicializar o cardápio:", error);
  }
});
