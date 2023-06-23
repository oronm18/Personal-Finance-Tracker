import React, { useState, useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';

interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface SavingGoal {
  name: string;
  current: number;
  target: number;
}

interface State {
  transactions: Transaction[];
  savingsGoals: SavingGoal[];
}

const initialState: State = {
  transactions: [],
  savingsGoals: [],
};

const useStyles = makeStyles((theme) => ({
  borderBox: {
    border: '1px solid #ccc',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    color: '#9c27b0', // Purple color
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [stateData, setStateData] = useState<State>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const transactions: Transaction[] = [
        { name: 'Salary', amount: 5000, category: 'Income', date: '2023-06-01' },
        { name: 'Rent', amount: -1000, category: 'Expense', date: '2023-06-01' },
      ];

      const savingsGoals: SavingGoal[] = [
        { name: 'New Car', current: 5000, target: 10000 },
        { name: 'Home', current: 0, target: 5000000 },
      ];

      setStateData({ transactions, savingsGoals });
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Box className={classes.borderBox}>
        <Typography variant="h4" className={classes.title}>Finance Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {/* Transactions */}
            <Typography variant="h6">Transactions</Typography>
            {/* Add Transaction Button */}
            <Button variant="contained" color="primary" onClick={() => console.log('Add transaction')}>
              Add Transaction
            </Button>
            {/* Remove Transaction Button */}
            <Button variant="contained" color="secondary" onClick={() => console.log('Remove transaction')}>
              Remove Transaction
            </Button>
            {/* Transactions Table */}
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {stateData.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Savings Goals */}
            <Typography variant="h6">Savings Goals</Typography>
            {/* Add Saving Goal Button */}
            <Button variant="contained" color="primary" onClick={() => console.log('Add saving goal')}>
              Add Saving Goal
            </Button>
            {/* Remove Saving Goal Button */}
            <Button variant="contained" color="secondary" onClick={() => console.log('Remove saving goal')}>
              Remove Saving Goal
            </Button>
            {/* Savings Goals Table */}
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Current</TableCell>
                      <TableCell>Target</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {stateData.savingsGoals.map((goal, index) => (
                    <TableRow key={index}>
                      <TableCell>{goal.name}</TableCell>
                      <TableCell>{goal.current}</TableCell>
                      <TableCell>{goal.target}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default Dashboard;
