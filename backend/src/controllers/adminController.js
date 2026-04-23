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

module.exports = { loginAdmin };