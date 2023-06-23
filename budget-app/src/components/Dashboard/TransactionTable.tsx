import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { fetchTransactions } from '../../api';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
}

const TransactionTable: React.FC = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const renderDialog = () => {
    if (!selectedTransaction) return null;

    return (
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Transaction Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedTransaction.name}
            disabled
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={selectedTransaction.amount}
            disabled
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={selectedTransaction.category}
            disabled
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="text"
            fullWidth
            value={selectedTransaction.date}
            disabled
          />
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
    <Box>
      <Paper>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} onClick={() => handleRowClick(transaction)}>
                  <TableCell component="th" scope="row">
                    {transaction.name}
                  </TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
                  <TableCell align="right">{transaction.category}</TableCell>
                  <TableCell align="right">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {renderDialog()}
    </Box>
  );
};

export default TransactionTable;
