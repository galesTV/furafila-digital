document.addEventListener("DOMContentLoaded", () => {
    const nomeSalvo = localStorage.getItem("alunoNome");

    if (!nomeSalvo) {
        window.location.href = "loginaluno.html";
        return;
    }

    const saudacaoTopo = document.querySelector("#topo p");
    if (saudacaoTopo) {
        saudacaoTopo.innerText = `Olá, ${nomeSalvo}`;
    }

    const btnLogout = document.getElementById("logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            
            localStorage.removeItem("alunoNome");
            localStorage.removeItem("alunoId");
            localStorage.removeItem("carrinho");
            alert("Sessão encerrada!");
            
            window.location.href = "loginaluno.html";
        });
    }
});