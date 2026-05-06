require("dotenv").config();
const express = require("express"); // Framework para criar o servidor e lidar com rotas
const cors = require("cors"); // Middleware para lidar com CORS (Cross-Origin Resource Sharing)
const path = require("path");

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite que o frontend acesse a API sem problemas de CORS
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON
app.use(express.urlencoded({ extended: true })); // Permite processar dados de formulários comuns

// Torna a pasta 'uploads' pública para que as imagens apareçam no navegador
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        message: "Servidor da FuraFila Digital funcionando!",
        status: "online"
    });
});

// Inicialização
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
