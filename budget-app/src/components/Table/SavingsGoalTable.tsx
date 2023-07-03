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
// export type SavingGoal = typeof createDynamicType(savingsGoalFields)
const savingsGoalKeys = savingsGoalFields.map((field) => field.id);
const savingsGoalInstance = createDynamicType(savingsGoalFields);
export type SavingsGoal = typeof savingsGoalInstance;

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
      headers={savingsGoalKeys}
      fields={savingsGoalFields}
      defaultItem={defaultItem}
      currentUserId={currentUserId}
      idFieldId="saving_goal_id"
    />
  );
};

export default SavingsGoalTable;
