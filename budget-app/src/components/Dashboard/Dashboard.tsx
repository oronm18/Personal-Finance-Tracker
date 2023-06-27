import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid, Typography, Card, CardContent } from '@material-ui/core';
import TransactionTable from '../Table/TransactionTable';
import SavingsGoalTable from '../Table/SavingsGoalTable';
import { fetchSavingsGoals, fetchTransactions } from '../../api';

interface DashboardProps {
  currentUserId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 800,
    padding: theme.spacing(2),
  },
}));

const Dashboard: React.FC<DashboardProps> = ({ currentUserId }) => {
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [totalSavingsGoals, setTotalSavingsGoals] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactions();
      const savingsGoals = await getSavingGoals();
      setTotalTransactions(transactions);
      setTotalSavingsGoals(savingsGoals);
    };

    fetchData();
  }, []);

  const getTransactions = async () => {
    const transactions = await fetchTransactions(currentUserId);
    return transactions.length;
  };

  const getSavingGoals = async () => {
    const savingsGoals = await fetchSavingsGoals(currentUserId);
    return savingsGoals.length;
  };


  return (
    <Box className={classes.root}>
      <Typography align="center" variant="h5">
        Dashboard
      </Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h5" component="h2">
                  {totalTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Savings Goals
                </Typography>
                <Typography variant="h5" component="h2">
                  {totalSavingsGoals}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <TransactionTable currentUserId={currentUserId} />
        <SavingsGoalTable currentUserId={currentUserId} />
      </Box>
    </Box>
  );
};

export default Dashboard;
