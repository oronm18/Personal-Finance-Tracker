import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { fetchSavingsGoals, fetchTransactions } from '../../api';

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

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [stateData, setStateData] = useState<State>(initialState);
  const [selectedData, setSelectedData] = useState<Transaction | SavingGoal | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Update the data fetching logic according to your actual data sources
  useEffect(() => {
    const fetchData = async () => {
      setStateData(
      {
        transactions: await fetchTransactions(),
        savingsGoals: await fetchSavingsGoals(),
      }
      );
      
    };
    fetchData();
  }, []);

  const handleRowClick = (data: Transaction | SavingGoal) => {
    setSelectedData(data);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const renderDialog = () => {
    if (!selectedData) return null;

    const isTransaction = 'category' in selectedData;

    return (
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{isTransaction ? 'Transaction Details' : 'Savings Goal Details'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedData.name}
            disabled
          />
          {isTransaction && (
            <>
              <TextField
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                value={(selectedData as Transaction).amount}
                disabled
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                value={(selectedData as Transaction).category}
                disabled
              />
              <TextField
                margin="dense"
                id="date"
                label="Date"
                type="text"
                fullWidth
                value={(selectedData as Transaction).date}
                disabled
              />
            </>
          )}
          {!isTransaction && (
            <>
              <TextField
                margin="dense"
                id="current"
                label="Current"
                type="number"
                fullWidth
                value={(selectedData as SavingGoal).current}
                disabled
              />
              <TextField
                margin="dense"
                id="target"
                label="Target"
                type="number"
                fullWidth
                value={(selectedData as SavingGoal).target}
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box className={classes.borderBox}>
      <Typography className={classes.title} variant="h5">Dashboard</Typography>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stateData.transactions.map((transaction, index) => (
                    <TableRow key={index} onClick={() => handleRowClick(transaction)}>
                      <TableCell component="th" scope="row">{transaction.name}</TableCell>
                      <TableCell align="right">{transaction.amount}</TableCell>
                      <TableCell align="right">{transaction.category}</TableCell>
                      <TableCell align="right">{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Current</TableCell>
                    <TableCell align="right">Target</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stateData.savingsGoals.map((goal, index) => (
                    <TableRow key={index} onClick={() => handleRowClick(goal)}>
                      <TableCell component="th" scope="row">{goal.name}</TableCell>
                      <TableCell align="right">{goal.current}</TableCell>
                      <TableCell align="right">{goal.target}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      {renderDialog()}
    </Box>
  );
};

export default Dashboard;
