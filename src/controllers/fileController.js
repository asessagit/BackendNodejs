import { promises as fs } from "fs";
import path from "path";
import { salvarArquivo } from "../models/fileModel.js";
import multer from "multer";

// // Configuração do armazenamento (destino dos arquivos)
// const storage = multer.diskStorage({
//     destination: (req, File, cb) => {
//       cb(null, 'uploads/');  // Define a pasta 'uploads' para armazenar os arquivos
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);  // Nome do arquivo com timestamp
//     }
//   });
  
//   // Criação do middleware de upload
//   const upload = multer({ storage: storage });

// // Rota para enviar um arquivo
// router.post("/file", upload.single("imgFile"), async (req, res) => {
//     try {
//       const { file } = req;
//       if (!file) {
//         return res.status(400).send('No file uploaded.');
//       }
//       // Processar o arquivo aqui
//       res.send({ message: "File uploaded successfully!", file });
//     } catch (err) {
//       res.status(500).send("Server error");
//     }
//   });

// Função para buscar arquivos em um diretório
export async function listarArquivos(req, res) {
    const { diretorio, extensao } = req.query;

    try {
        if (!diretorio || !extensao) {
            return res.status(400).json({ error: "Diretório ou extensão não fornecidos." });
        }

        // Caminho absoluto do diretório
        const diretorioAbsoluto = path.resolve(diretorio);

        // Verifica se o diretório existe
        if (!fs.existsSync(diretorioAbsoluto)) {
            return res.status(404).json({ error: "Diretório não encontrado." });
        }

        // Lista os arquivos no diretório filtrando pela extensão
        const arquivos = fs.readdirSync(diretorioAbsoluto).filter(file =>
            file.toLowerCase().endsWith(`.${extensao.toLowerCase()}`)
        );

        // Retorna os arquivos encontrados
        res.status(200).json({ arquivos });
    } catch (error) {
        console.error("Erro ao listar arquivos:", error.message);
        res.status(500).json({ error: "Erro ao buscar arquivos." });
    }
}

// Função para buscar arquivos e salvar no banco
export async function buscarArquivos(req, res) {
    const diretorio = req.query.path || "C:\\Users\\Administrador\\BackendNodejs\\uploads"; // Define o diretório padrão
    const tiposPermitidos = [".png", ".jpg", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".mp4", ".mp3", ".gif"];

    try {
        const diretoriosPermitidos = ["C:\\Users\\Administrador\\BackendNodejs\\uploads"];
        const diretorioAbsoluto = path.resolve(diretorio);

        // Verificar se o diretório está na lista de permitidos
        if (!diretoriosPermitidos.some(d => diretorioAbsoluto.startsWith(d))) {
            return res.status(403).json({ error: "Acesso negado ao diretório especificado." });
        }

        // Listar arquivos no diretório
        const arquivos = await fs.readdir(diretorioAbsoluto, { withFileTypes: true });
        console.log("Arquivos encontrados no diretório:", arquivos); // Log para verificar

        const arquivosEncontrados = [];

        for (const arquivo of arquivos) {
            if (arquivo.isFile()) {
                const extensao = path.extname(arquivo.name).toLowerCase();
                if (tiposPermitidos.includes(extensao)) {
                    const caminhoCompleto = path.join(diretorioAbsoluto, arquivo.name);

                    const arquivoInfo = {
                        nome: arquivo.name,
                        tipo: extensao,
                        caminho: caminhoCompleto,
                    };

                    arquivosEncontrados.push(arquivoInfo);

                    // Salvar no banco de dados
                    await salvarArquivo(arquivoInfo);
                }
            }
        }

        res.status(200).json({
            message: "Arquivos encontrados e salvos com sucesso!",
            arquivos: arquivosEncontrados.map(a => ({
                nome: a.nome,
                tipo: a.tipo,
                caminho: `/arquivos/${path.basename(a.caminho)}`,
            })),
        });
    } catch (error) {
        console.error("Erro ao buscar arquivos:", error.message);
        res.status(500).json({ error: "Erro ao buscar arquivos." });
    }
}


