import React, { useState, useEffect } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';

import {
  makeStyles,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface TableProps {
  fetchItems: () => Promise<TableItem[]>;
  addItem: (item: { [key: string]: string | number }) => Promise<TableItem>;
  removeItem: (item_name: any) => Promise<void>;
  headers: string[];
  itemDetails: (item: TableItem) => { name: string; value: string | number }[];
}

interface TableItem {
  [key: string]: string | number;
}

const DataTable: React.FC<TableProps> = ({
  fetchItems,
  addItem,
  removeItem,
  headers,
  itemDetails,
}) => {
  const classes = useStyles();
  const [items, setItems] = useState<TableItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputFields, setInputFields] = useState<{ [key: string]: string | number }>({});
  const [openAddDialog, setOpenAddDialog] = useState(false); // New state for handling add dialog

  useEffect(() => {
    const fetchData = async () => {
      setItems(await fetchItems());
    };
    fetchData();
  }, []);

  

  const handleAddItem = async () => {
    inputFields[headers[0]] = "temp_id"
    const response = await addItem(inputFields); // Use the inputFields state
    setItems([...items, response]);
    setOpenAddDialog(false); // Close the add dialog
    setInputFields({}); // Clear the input fields
  };

  const handleRowClick = (item: TableItem) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleRemoveItem = async () => {
    if (!selectedItem) return;
    const aaa = selectedItem[headers[0]]
    await removeItem(aaa);
    setItems(await fetchItems());
    handleClose();
  };

  const renderDialog = () => {
    if (!selectedItem) return null;
    const details = itemDetails(selectedItem);

    return (
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Item Details</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {details.map((detail, index) => (
            <TextField
              key={index}
              autoFocus={index === 0}
              margin="dense"
              id={detail.name}
              label={detail.name}
              type={typeof detail.value === 'number' ? 'number' : 'text'}
              fullWidth
              value={detail.value}
              disabled
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveItem} color="secondary">
            Remove
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
const renderAddDialog = () => (
  <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
    <DialogContent>
      <DialogContentText>Enter the details for the new item:</DialogContentText>
      {headers.map((header, index) => ( header != headers[0] &&
        <TextField
          key={index}
          autoFocus={index === 0}
          margin="dense"
          id={header}
          label={header}
          type={header.toLowerCase() === 'date' ? 'date' : 'text'} // Add condition for date field
          fullWidth
          InputLabelProps={header.toLowerCase() === 'date' ? { shrink: true } : {}} // For proper rendering of date field
          value={inputFields[header] || ''}
          onChange={(e) => setInputFields({ ...inputFields, [header]: e.target.value })}
        />
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleAddItem} color="primary">
        Add
      </Button>
      <Button onClick={() => setOpenAddDialog(false)} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);
  return (
    <Box>
      <Paper>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index} onClick={() => handleRowClick(item)}>
                  {headers.map((header, idx) => (
                    <TableCell key={idx} component={idx === 0 ? "th" : "td"} scope="row">
                      {
                        header == headers[0] &&
                        (itemDetails(item)[idx].value as string).slice(-4) ||
                        header != headers[0] &&
                        itemDetails(item)[idx].value
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
        Add Item
      </Button>
      {renderAddDialog()} 
      {renderDialog()}
    </Box>
  );
};

export default DataTable;
