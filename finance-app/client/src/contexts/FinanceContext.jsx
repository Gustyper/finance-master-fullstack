import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  }

  async function addTransaction(data) {
    const response = await api.post('/transactions', data);
    setTransactions([response.data, ...transactions]);
  }

  async function deleteTransaction(id) {
    await api.delete(`/transactions/${id}`);
    setTransactions(transactions.filter(t => t._id !== id));
  }

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction, loadTransactions }}>
      {children}
    </FinanceContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export function useFinance() {
  return useContext(FinanceContext);
}