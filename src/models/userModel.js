import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Define que o nome é obrigatorio
  email: { type: String, required: true, unique: true }, // Define que o email é unico
  senha: { type: String, required: true }, // Define que a senha é obrigatorio
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Define o role como 'user' por padrão
 }, { timestamps: true, collection: 'users'}); // Define explicitamente o nome da coleção como "users"  
  


export const User = mongoose.model('User', userSchema);
