const adminNameElement = document.querySelector('.admin-name');
const nomeSalvo = localStorage.getItem('adminNome');

if (nomeSalvo) {
    adminNameElement.textContent = `Olá, ${nomeSalvo}`;
}

const btnToggle = document.getElementById('toggle-dark');
btnToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    localStorage.removeItem('adminNome');
    window.location.href = 'adm login.html';
});