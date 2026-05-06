const loginForm = document.querySelector('.cadastro-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const escola = document.getElementById('escola').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/aluno/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ escola, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Bem-vindo(a)!");
            localStorage.setItem('alunoNome', data.user.nome); 
            window.location.href = 'menualuno.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Servidor offline ou erro na rede.');
    }
});