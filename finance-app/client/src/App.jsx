import { useState } from 'react';
import { useFinance } from './contexts/FinanceContext';
import { useSummary } from './hooks/useSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const { transactions, deleteTransaction } = useFinance();
  const summary = useSummary();
  const [activeTab, setActiveTab] = useState('all'); // 'all' ou 'stocks'

  // Filtra as transações baseada na aba ativa
  const filteredTransactions = activeTab === 'stocks' 
    ? transactions.filter(t => t.ticker) 
    : transactions;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Finanças Pro</h1>
      
      {/* Cards de Resumo */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h4>Saldo Total</h4>
          <p>R$ {summary.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('all')}>Todas</button>
        <button onClick={() => setActiveTab('stocks')}>Ações / FIIs</button>
      </div>

      <TransactionForm />
      <hr />

      <h3>{activeTab === 'all' ? 'Histórico Geral' : 'Meus Ativos'}</h3>
      <TransactionList 
        transactions={filteredTransactions} 
        onDelete={deleteTransaction} 
      />
    </div>
  );
}

export default App;