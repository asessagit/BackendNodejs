import { Product } from "../models/productModel.js";

export async function listarProdutos() {
  try {
    return await Product.find();
  } catch (error) {
    console.error("Erro ao listar produtos:", error.message);
    throw new Error("Erro ao listar produtos.");
  }
}

export async function listarProduto(id) {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error("Erro ao buscar produto:", error.message);
    throw new Error("Erro ao buscar produto.");
  }
}

export async function criarProduto(novoProduto) {
  try {
    return await Product.create(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error.message);
    throw new Error("Erro ao criar produto.");
  }
}

export async function atualizarProduto(id, dadosAtualizados) {
  try {
    return await Product.findByIdAndUpdate(id, dadosAtualizados, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.message);
    throw new Error("Erro ao atualizar produto.");
  }
}

export async function deletarProduto(id) {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    throw new Error("Erro ao deletar produto.");
  }
}
