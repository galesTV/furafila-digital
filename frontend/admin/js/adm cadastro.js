const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const escola = document.getElementById("escola").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const nomeGenerico = email.split("@")[0];

  try {
    const response = await fetch("https://furafila-digital.onrender.com/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeGenerico,
        escola,
        email,
        senha,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("adminNome", nomeGenerico);
      window.location.href = "adm login.html";
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
