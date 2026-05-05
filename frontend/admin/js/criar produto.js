const adminNameElement = document.querySelector('.admin-name');
const nomeSalvo = localStorage.getItem('adminNome');

if (nomeSalvo) {
    adminNameElement.textContent = `Olá, ${nomeSalvo}`;
}

const btnToggle = document.getElementById('toggle-dark');
btnToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    btnToggle.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    localStorage.removeItem('adminNome');
    window.location.href = 'adm login.html';
});

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;

    try {
        const response = await fetch('http://localhost:3000/products/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, categoria })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});