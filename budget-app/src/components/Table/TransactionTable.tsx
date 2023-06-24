import { fetchTransactions, addTransaction, removeTransaction } from '../../api';
import DataTable from './DataTable';

export const TransactionKeys = {
  transaction_id: '',
  name: '',
  amount: '',
  category: '',
  date: '',
};

export type Transaction = typeof TransactionKeys;

const transactionKeys: (keyof Transaction)[] = Object.keys(TransactionKeys) as (keyof Transaction)[];

const TransactionTable: React.FC = () => {
  return (
    <DataTable
      fetchItems={fetchTransactions}
      addItem={addTransaction}
      removeItem={removeTransaction}
      headers={transactionKeys.map(key => key)}
      itemDetails={(item: any) => transactionKeys.map(key => ({ name: key, value: item[key]}))}
    />
  );
};

export default TransactionTable;
