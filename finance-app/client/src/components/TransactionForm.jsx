import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext'; // Importa a chamada global pra api

function TransactionForm() {
  const { addTransaction } = useFinance(); // Pegamos a função de adicionar do contexto

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  
  // Novos estados para ativos
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Montamos o objeto de acordo com o que o nosso novo Model no Backend espera
    const data = { 
      title, 
      amount: Number(amount), 
      type, 
      category,
      ticker: (type === 'buy' || type === 'sell') ? ticker : undefined,
      quantity: (type === 'buy' || type === 'sell') ? Number(quantity) : undefined,
      unitPrice: (type === 'buy' || type === 'sell') ? (Number(amount) / Number(quantity)) : undefined
    };
    
    await addTransaction(data);

    // Limpa campos
    setTitle('');
    setAmount('');
    setCategory('');
    setTicker('');
    setQuantity('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <input placeholder="Título (ex: Compra de PETR4)" value={title} onChange={e => setTitle(e.target.value)} required />
      
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Receita (Salário, etc)</option>
        <option value="expense">Despesa (Contas, etc)</option>
        <option value="buy">Compra de Ativo (Ações/FIIs)</option>
        <option value="sell">Venda de Ativo</option>
      </select>

      {(type === 'buy' || type === 'sell') && (
        <>
          <input placeholder="Ticker (ex: PETR4)" value={ticker} onChange={e => setTicker(e.target.value)} required />
          <input type="number" placeholder="Quantidade" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        </>
      )}

      <input type="number" placeholder="Valor Total (R$)" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input placeholder="Categoria (ex: Lazer, Investimentos)" value={category} onChange={e => setCategory(e.target.value)} required />
      
      <button type="submit">Salvar Transação</button>
    </form>
  );
}

export default TransactionForm;