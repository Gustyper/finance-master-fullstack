const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Importa o template de transações

// Rota que cria uma transação (POST)
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, ticker, quantity, unitPrice } = req.body;
    
    // Cria uma nova instância do modelo com os dados recebidos
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category,
      ticker,
      quantity,
      unitPrice
    });

    // Salva no MongoDB
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction); // Retorna o que foi salvo e status 201 (Created)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota que lista todas as transações (GET)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota que deleta uma transação por ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
    
    res.json({ message: 'Transação removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;