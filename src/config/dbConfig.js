import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export default async function conectarAoBanco() {
    if (!MONGO_URI) {
        console.error('dbConfig: MONGO_URI não está definida nas variáveis de ambiente.');
        process.exit(1);
    }

    try {
        console.log('dbConfig: Conectando ao banco de dados MongoDB...');
        
        // Conectando ao MongoDB com o Mongoose
        await mongoose.connect(MONGO_URI);
        
        console.log('dbConfig: Conectado ao MongoDB com sucesso!');
    } catch (erro) {
        console.error('dbConfig: Erro ao conectar com o MongoDB!', erro);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}




// import mongoose from 'mongoose';
// // import dotenv from 'dotenv';

// const MONGO_URI = process.env.MONGO_URI;

// export default async function conectarAoBanco() {
//     try {
//         console.log('dbConfig: Conectando ao banco de dados MongoDB...');
        
//         // Conectando ao MongoDB com o Mongoose (sem as opções deprecated)
//         await mongoose.connect(MONGO_URI);
        
//         console.log('dbConfig: Conectado ao MongoDB com sucesso!');
//     } catch (erro) {
//         console.error('dbConfig: Erro ao conectar com o MongoDB!', erro);
//         process.exit(1); // Encerra o processo se a conexão falhar
//     }
// }

// // Carregar variáveis de ambiente do arquivo .env
// dotenv.config();

// export default async function conectarAoBanco() {
//     try {
//         // Usando a variável de ambiente para pegar a string de conexão
//         const STRING_CONEXAO = process.env.MONGO_URI;

//         // Conectando ao MongoDB utilizando o Mongoose
//         console.log('dbConfig: Conectando ao banco de dados MongoDB...');
        
//         await mongoose.connect(STRING_CONEXAO, {
//             useNewUrlParser: true, 
//             useUnifiedTopology: true
//         });
        
//         console.log('dbConfig: Conectado ao MongoDB com sucesso!');
//     } catch (erro) {
//         // Caso ocorra um erro, exibe a mensagem de erro no console
//         console.error('dbConfig: Falha na conexão com o banco!', erro);

//         // Encerra o processo com erro
//         process.exit();
//     }
// }

// import { MongoClient } from 'mongodb';
// export default async function conectarAoBanco(STRING_CONEXAO) {
//     let mongoClient; // Variável para armazenar a instância do MongoClient

//     try {
//         // Cria uma nova instância do MongoClient com a string de conexão fornecida
//         mongoClient = new MongoClient(STRING_CONEXAO);
//         console.log('dbConfig: Conectando ao cluster do banco de dados...');
        
//         // Tenta estabelecer a conexão com o servidor MongoDB
//         await mongoClient.connect();
//         console.log('dbConfig: Conectado ao MongoDB Atlas com sucesso!');

//         // Retorna a instância do MongoClient conectado
//         return mongoClient;
//     } catch (erro) {
//         // Caso ocorra um erro, exibe a mensagem de erro no console
//         console.error('dbConfig: Falha na conexão com o banco!', erro);

//         // Encerra o processo com erro (código de status não especificado, assume 0 por padrão)
//         process.exit();
//     }
// }
