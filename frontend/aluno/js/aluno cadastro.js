const registerForm = document.querySelector('.cadastro-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const escola = document.getElementById('escola').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const nomeGenerico = email.split('@')[0]; 

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nome: nomeGenerico, 
                escola, 
                email, 
                senha 
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = 'loginaluno.html'; 
        } else {
            alert(data.message || "Erro ao cadastrar aluno.");
        }
    } catch (error) {
        console.error('Erro na conexão:', error);
        alert('Não foi possível conectar ao servidor.');
    }
});