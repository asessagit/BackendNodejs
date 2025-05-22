import express from "express";
import {
  listarProduto,
  listarProdutos,
  criarProduto,
  deletarProduto,
  atualizarProduto,
} from "../controllers/productController.js";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de todos os produtos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Nenhum produto encontrado.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para listar todos os produtos
router.get("/", listarProdutos, async (req, res) => {
  try {
    const products = await listarProdutos();
    if (!products.length) {
      return res.status(404).json({ message: "Nenhum produto encontrado." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro na rota GET /products:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Detalhes do produto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
// Nova rota para listar um produto por _id
router.get("/:id", listarProduto, async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await listarProduto(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error("Erro na rota GET /products/:id:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para criar um novo produto
router.post("/", criarProduto, async (req, res) => {
  try {
    const novoProduto = req.body;
    const produtoCriado = await criarProduto(novoProduto);
    res.status(201).json(produtoCriado);
  } catch (error) {
    console.error("Erro na rota POST /products:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para atualizar um produto pelo ID
router.put("/:id", atualizarProduto, async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const produtoAtualizado = await atualizarProduto(id, dadosAtualizados);
    res.status(200).json({
      message: "Produto atualizado com sucesso!",
      data: produtoAtualizado,
    });
  } catch (error) {
    console.error("Erro na rota PUT /products/:id:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para deletar um produto pelo ID
router.delete("/:id", deletarProduto, async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDeletado = await deletarProduto(id);
    res.status(200).json({
      message: "Produto deletado com sucesso!",
      data: produtoDeletado,
    });
  } catch (error) {
    console.error("Erro na rota DELETE /products:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
