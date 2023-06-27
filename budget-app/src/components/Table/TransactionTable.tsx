import React from 'react';
import { fetchTransactions, addTransaction, removeTransaction } from '../../api';
import DataTable from './DataTable';
import { createDynamicType, Field} from '../../Utils';

const transactionFields: Field[] = [
  {
    id: 'transaction_id',
    display_name: 'Transaction ID',
    type: 'string',
    default: '',
  },
  {
    id: 'name',
    display_name: 'Name',
    type: 'string',
    default: '',
  },
  {
    id: 'amount',
    display_name: 'Amount',
    type: 'number',
    default: 0,
  },
  {
    id: 'category',
    display_name: 'Category',
    type: 'string',
    default: '',
  },
  {
    id: 'date',
    display_name: 'Date',
    type: 'string',
    default: '',
  },
];

const transactionInstance = createDynamicType(transactionFields);
export type Transaction = typeof transactionInstance;

const transactionKeys = transactionFields.map((field) => field.id);

interface TransactionsProps {
  currentUserId: string;
}

const TransactionsTable: React.FC<TransactionsProps> = ({ currentUserId }) => {
  const defaultItem = createDynamicType(transactionFields);

  return (
    <DataTable
      fetchItems={fetchTransactions}
      addItem={(item: Transaction, userId: string) => addTransaction(userId, item)}
      removeItem={removeTransaction}
      headers={transactionKeys}
      fields={transactionFields}
      defaultItem={defaultItem}
      currentUserId={currentUserId}
      idFieldId='transaction_id'
    />
  );
};

export default TransactionsTable;
