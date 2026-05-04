require("dotenv").config();
const express = require("express"); // Framework para criar o servidor e lidar com rotas
const cors = require("cors"); // Middleware para lidar com CORS (Cross-Origin Resource Sharing)

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite que o frontend acesse a API sem problemas de CORS
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON

// Rotas
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

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
