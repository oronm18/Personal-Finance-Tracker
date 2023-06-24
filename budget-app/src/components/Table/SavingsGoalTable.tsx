import React from 'react';
import { fetchSavingsGoals, addSavingsGoal, removeSavingsGoal } from '../../api';
import DataTable from './DataTable';

export const SavingsGoalKeys = {
  saving_goal_id: '',
  name: '',
  current: '',
  target: '',
};

export type SavingsGoal = typeof SavingsGoalKeys;

const savingsGoalKeys: (keyof SavingsGoal)[] = Object.keys(SavingsGoalKeys) as (keyof SavingsGoal)[];

interface SavingsGoalTableProps {
  currentUserId: string;
}

const SavingsGoalTable: React.FC<SavingsGoalTableProps> = ({ currentUserId }) => {
  return (
    <DataTable
      fetchItems={fetchSavingsGoals}
      addItem={addSavingsGoal}
      removeItem={removeSavingsGoal}
      headers={savingsGoalKeys.map(key => key)}
      itemDetails={(item: any) => savingsGoalKeys.map(key => ({ name: key, value: item[key] }))}
      currentUserId={currentUserId}
    />
  );
};

export default SavingsGoalTable;