// Importa as bibliotecas
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const transactionRoutes = require('./routes/transactions');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
  res.send('API do Gerenciador de Finanças rodando e conectada!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});