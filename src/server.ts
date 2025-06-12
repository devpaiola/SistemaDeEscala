import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Middleware global de CORS
app.use(cors({
  origin: 'https://escala-five.vercel.app/', // substitua pelo seu domínio real
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middleware para interpretar JSON
app.use(express.json());

// ✅ Middleware genérico para capturar todas as requisições
app.all('*', (req, res) => {
  res.json({ message: 'CORS está funcionando e esta é a resposta padrão.' });
});

// ✅ Porta de escuta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
