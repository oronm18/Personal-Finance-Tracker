import { fetchSavingsGoals, addSavingsGoal, removeSavingsGoal } from '../../api';
import DataTable from './DataTable';

const SavingsGoalTable: React.FC = () => {
  return (
    <DataTable
      fetchItems={fetchSavingsGoals}
      addItem={addSavingsGoal}
      removeItem={removeSavingsGoal}
      headers={["Name", "Current", "Target"]}
      itemDetails={(item) => [
        { name: "Name", value: item.name },
        { name: "Current", value: item.current },
        { name: "Target", value: item.target },
      ]}
    />
  );
};

export default SavingsGoalTable;
