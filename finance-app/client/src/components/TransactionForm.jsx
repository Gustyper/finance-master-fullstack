import { useState } from 'react';
import api from '../services/api';

function TransactionForm({ onTransactionAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { title, amount: Number(amount), type, category };
    
    try {
      await api.post('/transactions', data);
      setTitle('');
      setAmount('');
      setCategory('');
      onTransactionAdded(); // Chama a função do pai para atualizar a lista
    } catch (error) {
      alert('Erro ao salvar');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="number" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Receita</option>
        <option value="expense">Despesa</option>
      </select>
      <input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} required />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default TransactionForm;