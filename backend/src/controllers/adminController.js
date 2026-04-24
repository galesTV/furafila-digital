const registerAdmin = (req, res) => {
    const { escola, email, senha } = req.body;
    
    if (!escola || !email || !senha) {
        return res.status(400).json({ 
            message: "Erro: Todos os campos (escola, email, senha) são obrigatórios." 
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ message: "Erro: Formato de email inválido." });
    }

    console.log(`Tentativa de registro na escola: ${escola}`);

    return res.status(201).json({
        message: "Admin registrado com sucesso!",
        user: { 
            email: email, 
            escola: escola, 
            role: "admin" 
        }
    });
};

const loginAdmin = (req, res) => {
    const { escola, email, senha } = req.body;

    console.log(`Tentativa de login na escola: ${escola}`);

    // Lógica temporária de teste
    if (email === "admin@fatec.br" && senha === "admin123") {
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            user: { email, escola, role: "admin" }
        });
    }

    return res.status(401).json({ message: "Usuário ou senha inválidos." });
};

module.exports = { loginAdmin, registerAdmin };