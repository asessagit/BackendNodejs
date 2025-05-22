import dotenv from "dotenv";
import express from "express";
import productRoutes from "./src/routes/productRoute.js";
import fileRoutes from "./src/routes/fileRoute.js";
import userRoutes from "./src/routes/userRoute.js"; // Caminho para o arquivo de rotas
import conectarAoBanco from "./src/config/dbConfig.js";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config(); // Carrega as variáveis de ambiente
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global (opcional, se ainda não configurado nas rotas)
app.use(express.json());

// Servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

// Configuração das rotas
app.use("/api/products", productRoutes); // Prefixo para rotas de produtos
app.use("/api/files", fileRoutes); // Prefixo para rotas de arquivos
app.use("/api/users", userRoutes); // Prefixo para rotas de usuários

// Middleware do Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuração do CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Origem definida no .env
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Conectando ao banco de dados antes de iniciar o servidor
conectarAoBanco()
  .then(() => {
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Server rodando na porta: ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao iniciar o servidor:", erro);
  });
