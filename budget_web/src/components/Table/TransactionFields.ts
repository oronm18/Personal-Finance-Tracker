import { Field } from '../../Utils';

export const transactionFields: Field[] = [
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
    default: 'other',
  },
  {
    id: 'date',
    display_name: 'Date',
    type: 'date',
    default: '',
  },
];
