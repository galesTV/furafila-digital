const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const escola = document.getElementById("escola").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ escola, email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("adminNome", data.user.nome);

      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Erro na conexão:", error);
    alert("Não foi possível conectar ao servidor.");
  }
});

const btnToggle = document.getElementById("toggle-dark");
btnToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
