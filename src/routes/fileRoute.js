import express from "express"
import multer from "multer";
import { salvarArquivo } from "../models/fileModel.js";
import { listarArquivos, buscarArquivos } from "../controllers/fileController.js";

const router = express.Router();

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define o diretório
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Nome único para evitar conflitos
    },
});

const upload = multer ({ storage });// Configuração do multer({

// Rota para salvar arquivos no Banco de Dados
router.post("/upload", upload.single("file"), async (req, res) => {
try {
    const { originalname, mimetype, path } = req.file;
    const fileData = {
        nome: originalname,
        tipo: mimetype,
        caminho: path,
    };

    // Salvar no MongoDB
    const resultado = await salvarArquivo(fileData);
    res.status(201).json({ message: "Arquivo salvo com sucesso!", data: resultado });
} catch (error) {
    res.status(500).json({ error: error.message });
}
});
// console.log("Rota para salvar arquivos");

// Rota para listar arquivos por diretório e extensão
router.get("/", listarArquivos);
// console.log("Rota para listar arquivos");


// Rota para buscar arquivos
router.get("/", buscarArquivos);
// console.log("Rota para buscar arquivos");

export default router;