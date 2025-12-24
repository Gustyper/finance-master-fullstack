import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  }

  // Função para enviar os dados para o Backend
  async function handleAddTransaction(e) {
    e.preventDefault(); // Impede que a página recarregue

    const data = { title, amount: Number(amount), type, category };

    try {
      await api.post('/transactions', data);
      
      // Limpa os campos após o envio
      setTitle('');
      setAmount('');
      setCategory('');
      
      // Atualiza a lista automaticamente
      loadTransactions();
    } catch (error) {
      alert('Erro ao salvar transação');
    }
  }

  return (
    <div>
      <h1>Gerenciador de Finanças</h1>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleAddTransaction}>
        <input 
          placeholder="Título" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          required 
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
        <input 
          placeholder="Categoria" 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          required 
        />
        <button type="submit">Adicionar</button>
      </form>

      <hr />

      <ul>
        {transactions.map(t => (
          <li key={t._id}>
            {t.title} - R$ {t.amount} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;