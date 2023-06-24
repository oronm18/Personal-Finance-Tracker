import React from 'react';
import { makeStyles, Box, Grid, Typography } from '@material-ui/core';
import TransactionTable from '../Table/TransactionTable';
import SavingsGoalTable from '../Table/SavingsGoalTable';

const useStyles = makeStyles(theme => ({
  borderBox: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

interface DashboardProps {
  currentUserId: string;
  onLogin: (userId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUserId, onLogin }) => {
  return (
    <Box>
      <Typography align="center" variant="h5">Dashboard</Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TransactionTable currentUserId={currentUserId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SavingsGoalTable currentUserId={currentUserId} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;