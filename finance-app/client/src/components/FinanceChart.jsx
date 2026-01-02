import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSummary } from '../hooks/useSummary';

function FinanceChart() {
  const summary = useSummary();

  // O Recharts espera um Array de Objetos para montar as barras
  const data = [
    { name: 'Entradas', value: summary.income },
    { name: 'Saídas', value: summary.expense },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `R$ ${value.toFixed(2)}`}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--success)' : 'var(--danger)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinanceChart;