document.addEventListener("DOMContentLoaded", async () => {
  const alunoId = localStorage.getItem("alunoId");

  if (!alunoId) {
    alert("Usuário não identificado. Faça login.");
    window.location.href = "loginaluno.html";
    return;
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
      document.getElementById("perfil-serie").innerText =
        usuario.serie || "Não definida";
      document.getElementById("perfil-preferencia").innerText =
        usuario.preferencia_alimentar || "Nenhuma";

      const saldo = parseFloat(usuario.saldo_carteira) || 0;
      document.getElementById("perfil-saldo").innerText = saldo.toLocaleString(
        "pt-BR",
        { minimumFractionDigits: 2 },
      );
    }

    const resOrders = await fetch(
      `http://localhost:3000/orders/my-orders/${alunoId}`,
    );
    const pedidos = await resOrders.json();

    if (resOrders.ok) {
      const container = document.getElementById("container-pedidos");
      const ultimosPedidos = pedidos.slice(0, 3);

      let htmlPedidos = `<h2>Últimas Atividades</h2>
                           <p class="bolder">-Pedido- | -Data- | -Status-</p>`;

      ultimosPedidos.forEach((p) => {
        const dataF = new Date(p.data_pedido).toLocaleDateString("pt-BR");
        const statusF = p.status || p.status_pedido || "Pendente";
        htmlPedidos += `<p>#${p.id_pedido} | ${dataF} | ${statusF}</p>`;
      });

      container.innerHTML = htmlPedidos;
    }
  } catch (err) {
    console.error("Erro na integração:", err);
  }
});

const toggleBtn = document.getElementById("dark-mode-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "dark") body.classList.add("dark-mode");

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light",
  );
});