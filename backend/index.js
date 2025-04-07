import express from 'express';
import cors from 'cors';
import animalRoutes from './Routes/animals.js';

const app = express();

// Habilita CORS e parsing de JSON
app.use(cors());
app.use(express.json());

// Rotas relacionadas a animais
app.use('/animals', animalRoutes);

// Rota não encontrada
app.use((req, res) => {
  console.log(`Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Endpoint não encontrado" });
});

// Inicia o servidor
app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
