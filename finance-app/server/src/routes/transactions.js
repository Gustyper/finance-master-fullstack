const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Importa o template de transações

// Cria uma transação (POST)
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;
    
    // Cria uma nova instância do modelo com os dados recebidos
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category
    });

    // Salva no MongoDB
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction); // Retorna o que foi salvo e status 201 (Created)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lista todas as transações (GET)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;