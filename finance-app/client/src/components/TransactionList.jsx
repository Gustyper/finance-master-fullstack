function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.map(t => (
        <li key={t._id}>
          {t.title} - R$ {t.amount} ({t.type})
          <button onClick={() => onDelete(t._id)} style={{ color: 'red' }}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;