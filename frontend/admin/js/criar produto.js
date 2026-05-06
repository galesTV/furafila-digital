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

    const formData = new FormData();
    formData.append('nome', document.getElementById('nome').value);
    formData.append('preco', document.getElementById('preco').value);
    formData.append('categoria', document.getElementById('categoria').value);
    formData.append('imagem', document.getElementById('imagem').files[0]);

    try {
        const response = await fetch('http://localhost:3000/products/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Produto e imagem salvos!');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error(error);
    }
});