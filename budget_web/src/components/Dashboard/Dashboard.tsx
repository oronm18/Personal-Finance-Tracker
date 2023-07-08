import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import TransactionTable from '../Table/TransactionTable';
import SavingsGoalTable from '../Table/SavingsGoalTable';
import { fetchItems } from '../../api';
import { handleRefreshNavigate } from '../../Utils';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [totalSavingsGoals, setTotalSavingsGoals] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    if (!currentUserId) {
      navigate('/login');
    }}
    )

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
    const transactions = await fetchItems(currentUserId, "transactions");
    return transactions.length;
  };

  const getSavingGoals = async () => {
    const savingsGoals = await fetchItems(currentUserId, "savings-goals");
    return savingsGoals.length;
  };


  return (
    <Box className={classes.root}>
      <Box>
        <Typography align="center" variant="h5">
          Dashboard
        </Typography>
        <Button color="primary" onClick={() => { navigate('/budgeting'); }}>
          View Stats
        </Button>
      </Box>
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
        <TransactionTable currentUserId={currentUserId} setTotalTransactions={setTotalTransactions} />
        <SavingsGoalTable currentUserId={currentUserId} setTotalSavingsGoals={setTotalSavingsGoals} />
      </Box>
    </Box>
  );
};

export default Dashboard;
