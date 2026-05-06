const db = require("../models/db");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

const registerProduct = async (req, res) => {
  const { nome, preco, categoria } = req.body;

  const imagem = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nome || !preco || !categoria || !imagem) {
    return res.status(400).json({
      message: "Erro: Nome, preço, categoria e imagem são campos obrigatórios.",
    });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO produtos(nome, preco, categoria, imagem, ativo) VALUES (?, ?, ?, ?, ?)",
      [nome, preco, categoria, imagem, 1]
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