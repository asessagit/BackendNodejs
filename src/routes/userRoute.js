import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  listarUsuarios,
  listarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registrar novo usuário
 *     description: Cria um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação.
 */
router.post("/register", registrarUsuario);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login do usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post("/login", loginUsuario);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Nenhum usuário encontrado.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await listarUsuarios();
    if (!usuarios.length) {
      return res.status(404).json({ message: "Nenhum usuário encontrado." });
    }
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro na rota GET /users:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
// Nova rota para listar um usuário por _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await listarUsuario(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro na rota GET /users/:id:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const novoUsuario = req.body;
    const usuarioCriado = await criarUsuario(novoUsuario);
    res.status(201).json(usuarioCriado);
  } catch (error) {
    console.error("Erro na rota POST /users:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para atualizar um usuário pelo ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const usuarioAtualizado = await atualizarUsuario(id, dadosAtualizados);
    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      data: usuarioAtualizado,
    });
  } catch (error) {
    console.error("Erro na rota PUT /users/:id:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       500:
 *         description: Erro no servidor.
 */
// Rota para deletar um usuário pelo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioDeletado = await deletarUsuario(id);
    res
      .status(200)
      .json({
        message: "Usuário deletado com sucesso!",
        data: usuarioDeletado,
      });
  } catch (error) {
    console.error("Erro na rota DELETE /users:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
