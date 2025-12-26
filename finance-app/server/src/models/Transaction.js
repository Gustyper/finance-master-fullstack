const mongoose = require('mongoose');

// Schema: Define a "forma" do documento que será salvo no MongoDB.
// É importante para manter a consistência dos dados financeiros.
const TransactionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
  },
  amount: { 
    type: Number, 
    required: true 
  }, 
  type: { 
    type: String, 
    enum: ['income', 'expense', 'buy', 'sell'], 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  ticker: { 
    type: String, 
    uppercase: true // Para passar petr4 para PETR4 
  },
  quantity: { 
    type: Number, 
    default: 0 
  },
  unitPrice: { 
    type: Number, 
    default: 0 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Exportamos o modelo para que possamos realizar operações de CRUD nas rotas
module.exports = mongoose.model('Transaction', TransactionSchema);