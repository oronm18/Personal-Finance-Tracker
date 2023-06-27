// Budgeting.tsx
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// We will use this color scheme for our charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Assume you have data like this for expenses. You should fetch actual data from your API.
const expenseData = [
  { name: 'Rent', value: 400 },
  { name: 'Grocery', value: 300 },
  { name: 'Entertainment', value: 200 },
  { name: 'Transport', value: 100 },
];

// Assume you have data like this for savings. You should fetch actual data from your API.
const savingsData = [
  { name: 'Goal', value: 1000 },
  { name: 'Current', value: 400 },
];

const Budgeting: React.FC = () => {
  return (
    <Box>
      <Typography align="center" variant="h5">
        Budgeting
      </Typography>
      <Box mt={3}>
        <Box mb={5}>
          <Typography align="center" variant="h6">
            Expense Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box mb={5}>
          <Typography align="center" variant="h6">
            Savings Goals
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={savingsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {savingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Budgeting;
