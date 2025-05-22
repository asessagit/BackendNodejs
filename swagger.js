import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend NodeJs",
      version: "1.0.0",
      description: "Documentação da API com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api/docs", // Altere conforme necessário
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: { type: "string", description: "Nome do usuário" },
            email: { type: "string", description: "Email do usuário" },
            senha: { type: "string", description: "Senha do usuário" },
          },
        },
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: { type: "string", description: "Email do usuário" },
            senha: { type: "string", description: "Senha do usuário" },
          },
        },
        Produto: {
          type: "object",
          required: [
            "nome",
            "descricao",
            "preco",
            "imgUrl",
            "alt",
            "categoria",
            "marca",
          ],
          properties: {
            id: {
              type: "string",
              description: "ID do produto gerado pelo MongoDB.",
            },
            nome: {
              type: "string",
              description: "Nome do produto.",
            },
            descricao: {
              type: "string",
              description: "Descrição detalhada do produto.",
            },
            preco: {
              type: "number",
              description: "Preço do produto.",
            },
            imgUrl: {
              type: "string",
              description: "URL da imagem do produto.",
            },
            alt: {
              type: "string",
              description: "Texto alternativo para a imagem.",
            },
            categoria: {
              type: "string",
              description: "Categoria do produto.",
            },
            marca: {
              type: "string",
              description: "Marca do produto.",
            },
          },
          example: {
            id: "64d1f83b2f64f64a22e2f24b",
            nome: "Tênis de Corrida",
            descricao: "Tênis de alta performance para corridas.",
            preco: 299.99,
            imgUrl: "/uploads/tenis-corrida.jpg",
            alt: "Imagem de tênis de corrida",
            categoria: "Esportes",
            marca: "Nike",
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Se você estiver usando JWT
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/userRoute.js", "./src/routes/productRoute.js"], // Inclua os arquivos corretos para suas rotas
};

// Gerar a documentação
const swaggerSpec = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
