import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    descricao: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, "Preço é obrigatório"],
    },
    imgUrl: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    categoria: {
      type: String,
      required: [true, "Categoria é obrigatória"],
    },
    marca: {
      type: String,
      required: [true, "Marca é obrigatória"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export async function getAllProducts() {
  try {
    return await Product.find();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    throw new Error("Erro ao acessar os produtos no banco de dados.");
  }
}

export async function createProduct(novoProduto) {
  try {
    return await Product.create(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error.message);
    throw new Error("Erro ao criar produto no banco de dados.");
  }
}

export async function getProductById(id) {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error("Erro ao buscar produto:", error.message);
    throw new Error("Erro ao acessar o produto no banco de dados.");
  }
}

export async function updateProduct(id, dadosAtualizados) {
  try {
    return await Product.findByIdAndUpdate(id, dadosAtualizados, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error.message);
    throw new Error("Erro ao atualizar produto no banco de dados.");
  }
}

export async function deleteProduct(id) {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    throw new Error("Erro ao deletar produto no banco de dados.");
  }
}

export { Product };
