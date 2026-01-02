import { useFinance } from '../contexts/FinanceContext';

export function useSummary() {
  const { transactions } = useFinance();

  return transactions.reduce((acc, t) => {
    if (t.type === 'income' || t.type === 'sell') {
      acc.income += t.amount;
    } else {
      acc.expense += t.amount;
    }
    acc.total = acc.income - acc.expense;
    return acc;
  }, { income: 0, expense: 0, total: 0 });
}