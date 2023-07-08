import React from 'react';
import DataTable from './DataTable';
import { createDynamicType, Field} from '../../Utils';

const transactionFields: Field[] = [
  {
    id: 'item_id',
    display_name: 'ID',
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
    type: 'select',
    choices: ["a", "b", "c"],
    default: 'a',
  },
  {
    id: 'date',
    display_name: 'Date',
    type: 'date',
    default: '',
  },
];

const transactionInstance = createDynamicType(transactionFields);
export type Transaction = typeof transactionInstance;

const transactionKeys = transactionFields.map((field) => field.id);

interface TransactionsProps {
  currentUserId: string;
  setTotalTransactions: any;
}

const TransactionsTable: React.FC<TransactionsProps> = ({ currentUserId, setTotalTransactions }) => {
  const defaultItem = createDynamicType(transactionFields);

  return (
    <DataTable
      itemType={"transactions"}
      headers={transactionKeys}
      fields={transactionFields}
      defaultItem={defaultItem}
      currentUserId={currentUserId}
      idFieldId='item_id'
      setTotal={setTotalTransactions}
    />
  );
};

export default TransactionsTable;
