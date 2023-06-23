import { fetchTransactions, addTransaction, removeTransaction } from '../../api';
import DataTable from './DataTable';

const TransactionTable: React.FC = () => {
  return (
    <DataTable
      fetchItems={fetchTransactions}
      addItem={addTransaction}
      removeItem={removeTransaction}
      headers={["Name", "Amount", "Category", "Date"]}
      itemDetails={(item) => [
        { name: "Name", value: item.name },
        { name: "Amount", value: item.amount },
        { name: "Category", value: item.category },
        { name: "Date", value: item.date },
      ]}
    />
  );
};

export default TransactionTable;
