require("dotenv").config();
const express = require("express"); 
const cors = require("cors"); 

// 1. IMPORTAÇÃO DAS ROTAS
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require("./routes/productRoutes");

// 2. INICIALIZAÇÃO DO APP (Isso deve vir antes de usar as rotas!)
const app = express();
const PORT = process.env.PORT || 3000;

// 3. MIDDLEWARES
app.use(cors()); 
app.use(express.json()); 

// 4. DEFINIÇÃO DAS ROTAS
// Note: Mudei para "/aluno" para bater com o seu fetch do frontend
app.use("/admin", adminRoutes);
app.use("/aluno", userRoutes); // Se o seu JS do front chama /aluno/login, use "/aluno" aqui
app.use("/user", userRoutes);  // Mantive este caso você use /user em outro lugar
app.use("/products", productRoutes);

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        message: "Servidor da FuraFila Digital funcionando!",
        status: "online"
    });
});

// 5. INICIALIZAÇÃO
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});