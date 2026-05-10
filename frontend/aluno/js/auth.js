(function () {
  const alunoLogado = localStorage.getItem("alunoNome");

  if (!alunoLogado) {
    alert("Acesso negado. Por favor, faça login primeiro.");
    window.location.href = "loginaluno.html";
  }
})();
