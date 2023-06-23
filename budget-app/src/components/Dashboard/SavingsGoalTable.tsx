import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { fetchSavingsGoals } from '../../api';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface SavingGoal {
  name: string;
  current: number;
  target: number;
}

const SavingsGoalTable: React.FC = () => {
  const classes = useStyles();
  const [savingsGoals, setSavingsGoals] = useState<SavingGoal[]>([]);
  const [selectedSavingsGoal, setSelectedSavingsGoal] = useState<SavingGoal | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSavingsGoals();
      setSavingsGoals(data);
    };
    fetchData();
  }, []);

  const handleRowClick = (savingsGoal: SavingGoal) => {
    setSelectedSavingsGoal(savingsGoal);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const renderDialog = () => {
    if (!selectedSavingsGoal) return null;

    return (
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Savings Goal Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedSavingsGoal.name}
            disabled
          />
          <TextField
            margin="dense"
            id="current"
            label="Current"
            type="number"
            fullWidth
            value={selectedSavingsGoal.current}
            disabled
          />
          <TextField
            margin="dense"
            id="target"
            label="Target"
            type="number"
            fullWidth
            value={selectedSavingsGoal.target}
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
                <TableCell align="right">Current</TableCell>
                <TableCell align="right">Target</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savingsGoals.map((goal, index) => (
                <TableRow key={index} onClick={() => handleRowClick(goal)}>
                  <TableCell component="th" scope="row">
                    {goal.name}
                  </TableCell>
                  <TableCell align="right">{goal.current}</TableCell>
                  <TableCell align="right">{goal.target}</TableCell>
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

export default SavingsGoalTable;
