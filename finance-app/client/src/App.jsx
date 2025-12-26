import { useEffect, useState } from 'react';
import api from './services/api';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  }

  async function handleDelete(id) {
    await api.delete(`/transactions/${id}`);
    setTransactions(transactions.filter(t => t._id !== id));
  }

  // Calculando os valores totais
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h1>Gerenciador de Finanças</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h3>Entradas</h3>
          <p style={{ color: 'green' }}>R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <h3>Saídas</h3>
          <p style={{ color: 'red' }}>R$ {totalExpense.toFixed(2)}</p>
        </div>
        <div>
          <h3>Saldo Total</h3>
          <p style={{ fontWeight: 'bold' }}>R$ {balance.toFixed(2)}</p>
        </div>
      </div>

      <TransactionForm onTransactionAdded={loadTransactions} />
      <hr />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App;