import React from 'react';
import DataTable from './DataTable';
import { createDynamicType, Field} from '../../Utils';

const savingsGoalFields: Field[] = [
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

const savingGoalsInstance = createDynamicType(savingsGoalFields);
export type SavingsGoal = typeof savingGoalsInstance;

const transactionKeys = savingsGoalFields.map((field) => field.id);

interface SavingsGoalTableProps {
  currentUserId: string;
  setTotalSavingsGoals: any;
}

const SavingsGoalTable: React.FC<SavingsGoalTableProps> = ({ currentUserId, setTotalSavingsGoals }) => {
  const defaultItem = createDynamicType(savingsGoalFields);

  return (
    <DataTable
      itemType={"savings-goals"}
      headers={transactionKeys}
      fields={savingsGoalFields}
      defaultItem={defaultItem}
      currentUserId={currentUserId}
      idFieldId="item_id"
      setTotal={setTotalSavingsGoals}
    />
  );
};

export default SavingsGoalTable;
