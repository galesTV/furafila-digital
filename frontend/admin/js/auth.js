document.addEventListener("DOMContentLoaded", () => {
    const nomeSalvo = localStorage.getItem("adminNome");

    if (!nomeSalvo) {
        window.location.href = "/admin/adm login.html";
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
            
            localStorage.removeItem("adminNome");
            localStorage.removeItem("adminId");
            alert("Sessão encerrada!");
            
            window.location.href = "/admin/adm login.html";
        });
    }
});