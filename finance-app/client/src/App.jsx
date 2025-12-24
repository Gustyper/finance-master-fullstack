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

  return (
    <div>
      <h1>Gerenciador de Finanças</h1>
      <TransactionForm onTransactionAdded={loadTransactions} />
      <hr />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App;