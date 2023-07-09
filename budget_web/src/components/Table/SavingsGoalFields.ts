import { Field } from '../../Utils';

export const savingsGoalFields: Field[] = [
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
    id: 'current',
    display_name: 'Current',
    type: 'number',
    default: 0,
  },
  {
    id: 'target',
    display_name: 'Target',
    type: 'number',
    default: 0,
  },
];
