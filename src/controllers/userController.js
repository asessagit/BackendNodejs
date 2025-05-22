import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const secret = process.env.JWT_SECRET || "secrettoken";

// Registrar usuário
export const registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário: " + error.message });
  }
};

// Login de usuário
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida)
      return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: usuario._id, role: usuario.role }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Login realizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor: " + error.message });
  }
};

// Listar todos os usuários
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao listar usuários: " + error.message });
  }
};

// Listar um usuário pelo ID
export const listarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findById(id);
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuário: " + error.message });
  }
};

// Criar um novo usuário
export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usuário: " + error.message });
  }
};

// Atualizar um usuário pelo ID
export const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(
      id,
      dadosAtualizados,
      { new: true }
    );
    if (!usuarioAtualizado)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      data: usuarioAtualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário: " + error.message });
  }
};

// Deletar um usuário pelo ID
export const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioDeletado = await User.findByIdAndDelete(id);
    if (!usuarioDeletado)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(200).json({
      message: "Usuário deletado com sucesso!",
      data: usuarioDeletado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar usuário: " + error.message });
  }
};
