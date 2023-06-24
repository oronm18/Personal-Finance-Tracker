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

interface TransactionTableProps {
  currentUserId: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ currentUserId }) => {
  return (
    <DataTable
      fetchItems={fetchTransactions}
      addItem={addTransaction}
      removeItem={removeTransaction}
      headers={transactionKeys.map(key => key)}
      itemDetails={(item: any) => transactionKeys.map(key => ({ name: key, value: item[key]}))}
      currentUserId={currentUserId}
    />
  );
};

export default TransactionTable;
