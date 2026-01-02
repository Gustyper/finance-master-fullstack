import { useState } from 'react';
import { useFinance } from './contexts/FinanceContext';
import { useSummary } from './hooks/useSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FinanceChart from './components/FinanceChart';

function App() {
  const { transactions, deleteTransaction } = useFinance();
  const summary = useSummary();
  const [activeTab, setActiveTab] = useState('all'); // 'all' ou 'stocks'

  // Filtra as transações baseada na aba ativa
  const filteredTransactions = activeTab === 'stocks' 
    ? transactions.filter(t => t.ticker) 
    : transactions;

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h1>Finanças Pro</h1>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card">
          <small>Entradas</small>
          <h2 style={{ color: 'var(--success)' }}>R$ {summary.income.toFixed(2)}</h2>
        </div>
        <div className="card">
          <small>Saídas</small>
          <h2 style={{ color: 'var(--danger)' }}>R$ {summary.expense.toFixed(2)}</h2>
        </div>
        <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
          <small>Saldo Total</small>
          <h2>R$ {summary.total.toFixed(2)}</h2>
        </div>
      </div>

      <div className="card">
        <h3>Visão Geral (Receitas vs Despesas)</h3>
        <FinanceChart />
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Geral</button>
          <button className={`tab-btn ${activeTab === 'stocks' ? 'active' : ''}`} onClick={() => setActiveTab('stocks')}>Investimentos</button>
        </div>
        
        <TransactionForm />
      </div>

      <div className="card">
        <h3>{activeTab === 'all' ? 'Histórico' : 'Meus Ativos'}</h3>
        <TransactionList transactions={filteredTransactions} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}

export default App;