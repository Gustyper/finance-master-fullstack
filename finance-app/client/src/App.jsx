import { useFinance } from './contexts/FinanceContext'; // Importamos o acesso aos dados globais
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  // Pegamos tudo o que precisamos do "contexto global"
  const { transactions, deleteTransaction, loadTransactions } = useFinance();

  // Os cálculos continuam aqui, pois eles dependem da lista 'transactions' que veio do contexto
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

      <TransactionForm /> 
      <hr />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App;