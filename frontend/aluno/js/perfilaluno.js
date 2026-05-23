document.addEventListener("DOMContentLoaded", async () => {
  const alunoId = localStorage.getItem("alunoId");

  if (!alunoId) {
    alert("Usuário não identificado. Faça login.");
    window.location.href = "loginaluno.html";
    return;
  }

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  try {
    const resUser = await fetch(`http://localhost:3000/user/${alunoId}`);
    const usuario = await resUser.json();

    if (resUser.ok) {
      document.getElementById("perfil-nome").innerText =
        usuario.nome || "Não informado";
      document.getElementById("perfil-email").innerText =
        usuario.email || "Não informado";
      document.getElementById("perfil-id-escola").innerText =
        usuario.id_escola || "Não informado";

      if (usuario.nome) {
        document.getElementById("boas-vindas-user").innerHTML =
          `Olá, <strong>${usuario.nome.split(" ")[0]}</strong>`;
      }

      const saldo = parseFloat(usuario.saldo_carteira) || 0;
      document.getElementById("perfil-saldo").innerText = saldo.toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      );
    }

    const resOrders = await fetch(
      `http://localhost:3000/orders/my-orders/${alunoId}`,
    );
    const pedidos = await resOrders.json();

    if (resOrders.ok) {
      const container = document.getElementById("container-pedidos");
      const ultimosPedidos = pedidos.slice(0, 3);

      if (ultimosPedidos.length === 0) {
        container.innerHTML = `<p style="text-align:center; padding:15px; color:var(--text-label);">Nenhum pedido recente.</p>`;
        return;
      }

      let htmlPedidos = "";
      ultimosPedidos.forEach((p) => {
        const dataF = new Date(p.data_pedido).toLocaleDateString("pt-BR");
        const statusF = p.status || p.status_pedido || "Pendente";

        let classeStatus = "pendente";
        if (statusF.toLowerCase() === "pronto") classeStatus = "pronto";
        if (statusF.toLowerCase() === "entregue") classeStatus = "entregue";

        htmlPedidos += `
          <div class="item-pedido-resumo">
            <div class="item-pedido-info">
              <p class="id-p">#${p.id_pedido}</p>
              <p class="data-p">${dataF}</p>
            </div>
            <span class="status-tag ${classeStatus}">${statusF}</span>
          </div>
        `;
      });

      container.innerHTML = htmlPedidos;
    }
  } catch (err) {
    console.error("Erro na integração do perfil:", err);
  }
});

const toggleBtn = document.getElementById("toggle-dark");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
