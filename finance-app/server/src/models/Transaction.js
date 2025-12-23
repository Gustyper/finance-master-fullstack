const mongoose = require('mongoose');

// Schema: Define a "forma" do documento que será salvo no MongoDB.
// É importante para manter a consistência dos dados financeiros.
const TransactionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // O banco rejeitará se não houver título
  },
  amount: { 
    type: Number, 
    required: true // Valor numérico da transação
  },
  type: { 
    type: String, 
    enum: ['income', 'expense'], // Valida se é apenas entrada ou saída
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now // Se não enviarmos data, o Mongo usa a data atual
  }
});

// Exportamos o modelo para que possamos realizar operações de CRUD nas rotas
module.exports = mongoose.model('Transaction', TransactionSchema);