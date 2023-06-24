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


const SavingsGoalTable: React.FC = () => {
  return (
    <DataTable
      fetchItems={fetchSavingsGoals}
      addItem={addSavingsGoal}
      removeItem={removeSavingsGoal}
      headers={savingsGoalKeys.map(key => key)}
      itemDetails={(item: any) => savingsGoalKeys.map(key => ({ name: key, value: item[key]}))}
    />
  );
};

export default SavingsGoalTable;