import React from 'react';
import { fetchSavingsGoals, addSavingsGoal, removeSavingsGoal, updateSavingsGoal } from '../../api';
import DataTable from './DataTable';
import { createDynamicType, Field} from '../../Utils';

const savingsGoalFields: Field[] = [
  {
    id: 'saving_goal_id',
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
}

const SavingsGoalTable: React.FC<SavingsGoalTableProps> = ({ currentUserId }) => {
  const defaultItem = createDynamicType(savingsGoalFields);

  return (
    <DataTable
      fetchItems={fetchSavingsGoals}
      addItem={addSavingsGoal}
      updateItem={updateSavingsGoal}
      removeItem={removeSavingsGoal}
      headers={transactionKeys}
      fields={savingsGoalFields}
      defaultItem={defaultItem}
      currentUserId={currentUserId}
      idFieldId="saving_goal_id"
    />
  );
};

export default SavingsGoalTable;
