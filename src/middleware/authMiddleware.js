import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => { 
  const token = req.headers['authorization']; // Pega o token do cabeçalho
  if (!token) return res.status(403).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secrettoken'); // Verifica e decodifica o token
    req.user = decoded; // Armazena o usuário decodificado na requisição
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const verificarRoleAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') { // Verifica se o role do usuário é 'admin'
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar.' });
  }
  next();
};
