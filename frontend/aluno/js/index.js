const alunoNameElement = document.querySelector('.admin-name'); // Ajuste a classe se no menu do aluno for diferente
const nomeSalvo = localStorage.getItem('alunoNome');

if (nomeSalvo && alunoNameElement) {
    alunoNameElement.textContent = `Bem-vindo, ${nomeSalvo}`;
}

// Botão de Logout
const logout = document.getElementById('logout');
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('alunoNome');
        window.location.href = 'loginaluno.html';
    });
}