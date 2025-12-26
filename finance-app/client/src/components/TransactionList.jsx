function TransactionList({ transactions, onDelete }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Histórico de Atividades</h3>
      <ul style={{ padding: 0 }}>
        {transactions.map(t => (
          <li key={t._id} style={{ 
            borderBottom: '1px solid #eee', 
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{t.title}</strong>
              <div style={{ fontSize: '0.85em', color: '#666' }}>
                {t.category} • {new Date(t.date).toLocaleDateString()}
                
                {/* Se houver ticker, exibe as informações do ativo */}
                {t.ticker && (
                  <span style={{ marginLeft: '10px', color: '#007bff', fontWeight: 'bold' }}>
                    [{t.ticker}] {t.quantity} un. @ R$ {(t.amount / t.quantity).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ 
                color: (t.type === 'income' || t.type === 'sell') ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
                {(t.type === 'expense' || t.type === 'buy') ? '- ' : '+ '}
                R$ {t.amount.toFixed(2)}
              </span>
              
              <button 
                onClick={() => onDelete(t._id)} 
                style={{ 
                  backgroundColor: '#ff4d4d', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;