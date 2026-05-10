const db = require("../models/db");
const bcrypt = require("bcrypt");

const registerStudent = async (req, res) => {
  const { escola, email, senha, nome } = req.body;

  if (!escola || !email || !senha || !nome) {
    return res.status(400).json({
      message:
        "Erro: Todos os campos (escola, email, senha, nome) são obrigatórios.",
    });
  }

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: "Erro: Formato de email inválido." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const [result] = await db.execute(
      "INSERT INTO usuarios(nome, email, senha, id_escola, tipo_perfil) VALUES (?, ?, ?, ?, ?)",
      [nome, email, senhaCriptografada, escola, "aluno"],
    );

    return res.status(201).json({
      message: "Aluno cadastrado com sucesso!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao registrar aluno:", error);
    if (error.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "Email já cadastrado." });
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

const loginStudent = async (req, res) => {
  const { escola, email, senha } = req.body;

  if (!escola || !email || !senha) {
    return res.status(400).json({
      message: "Erro: Todos os campos (escola, email, senha) são obrigatórios.",
    });
  }

  try {
    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ? AND id_escola = ? AND tipo_perfil = ?",
      [email, escola, "aluno"],
    );

    if (usuarios.length === 0)
      return res.status(401).json({ message: "Usuário não encontrado." });

    const usuario = usuarios[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida)
      return res.status(401).json({ message: "Senha incorreta." });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        escola: usuario.id_escola,
        role: usuario.tipo_perfil,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor." });
  }
};

module.exports = { registerStudent, loginStudent };
