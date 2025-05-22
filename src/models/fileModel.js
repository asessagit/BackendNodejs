import mongoose from "mongoose";

// Novo esquema para armazenar informações dos arquivos
const fileSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true // Remove espaços extras no início e fim
    },
    tipo: {
        type: String,
        required: true // Tipo do arquivo (imagem, vídeo, etc.)
    },
    caminho: {
        type: String,
        required: true // Caminho completo do arquivo no sistema
    },
}, {
    timestamps: true // Cria campos "createdAt" e "updatedAt" automaticamente
});

// Criando o modelo para arquivos
const File = mongoose.model("File", fileSchema);

// Função para salvar informações do arquivo no banco
async function salvarArquivo(dadosArquivo) {
    try {
        const novoArquivo = await File.create(dadosArquivo);
        return novoArquivo;
    } catch (error) {
        console.error("Erro ao salvar arquivo no banco:", error.message);
        throw new Error("Erro ao salvar arquivo no banco de dados.");
    }
}

// Exportando o modelo e a função
export { File, salvarArquivo }; // Exporta apenas uma vez