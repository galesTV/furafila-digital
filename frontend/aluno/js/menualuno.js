const modal = document.getElementById("Modal1");
const btn = document.getElementById("Abrir1");
const span = document.getElementsByClassName("fechar1")[0];

// Abre o modal da coxinha
btn.onclick = function() {
  modal.style.display = "block";
}

// Fecha o modal no "X" da coxinha
span.onclick = function() {
  modal.style.display = "none";
}

// Fecha o modal se o usuário clicar fora da caixa branca da coxinha
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
