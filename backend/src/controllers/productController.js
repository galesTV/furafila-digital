const db = require("../models/db");
const bcrypt = require("bcrypt");

const registerProduct = async (req, res) => {
  const { nome, preco, categoria } = req.body;

  if (!nome || !preco || !categoria) {
    return res.status(400).json({
      message: "Erro: Nome, preço e categoria são campos obrigatórios.",
    });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO produtos(nome, preco, categoria, ativo) VALUES (?, ?, ?, ?)",
      [nome, preco, categoria, 1]
    );

    return res.status(201).json({
      message: "Produto registrado com sucesso!",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao registrar produto:", error);
    
    if (error.code === "ER_DATA_TOO_LONG") {
      return res.status(400).json({ message: "Erro: Valor muito longo para um dos campos." });
    }
    
    return res.status(500).json({ message: "Erro interno do servidor ao registrar produto." });
  }
};

const listProducts = async (req, res) => {
  try {
    const [produtos] = await db.execute("SELECT * FROM produtos");
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};

module.exports = { registerProduct, listProducts };