import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import AddDialog from '../Dialog/AddDialog';
import DetailDialog from '../Dialog/DetailDialog';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Field, createDynamicType } from '../../Utils';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

interface DataTableProps {
  fetchItems: (userId: string) => Promise<any[]>;
  addItem: (item: any, userId: string) => Promise<void>;
  removeItem: (itemId: string, userId: string) => Promise<void>;
  headers: string[];
  fields: Field[];
  defaultItem: any;
  currentUserId: string;
  idFieldId: string;
}

const DataTable: React.FC<DataTableProps> = ({ fetchItems, addItem, removeItem, headers, fields, defaultItem, currentUserId, idFieldId }) => {
  const classes = useStyles();
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const fetchedItems = await fetchItems(currentUserId);
    setItems(fetchedItems);
  };

  const handleAddItem = async (item: any) => {
    await addItem(item, currentUserId);
    getItems();
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId, currentUserId);
    getItems();
  };

  const handleViewItemDetails = (item: any) => {
    setSelectedItem(item);
    setDetailDialogOpen(true);
  };

  return (
    <Box mt={3}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                if (header === idFieldId) {
                  return null; // Skip rendering the ID field in the table header
                }
                return <TableCell key={header}>{header}</TableCell>;
              })}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item[headers[0]]}>
                {fields.map((field) => {
                  if (field.id === idFieldId) {
                    return null; // Skip rendering the ID field in the table row
                  }
                  return <TableCell key={field.id}>{item[field.id]}</TableCell>;
                })}
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => handleRemoveItem(item[headers[0]])}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View">
                    <IconButton aria-label="view" onClick={() => handleViewItemDetails(item)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Tooltip title="Add">
          <IconButton aria-label="add" onClick={() => setAddItemDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <AddDialog open={addItemDialogOpen} handleClose={() => setAddItemDialogOpen(false)} handleSubmit={handleAddItem} fields={fields} idFieldId={idFieldId} />
      <DetailDialog open={detailDialogOpen} handleClose={() => setDetailDialogOpen(false)} item={selectedItem} fields={fields} idFieldId={idFieldId} />
    </Box>
  );
};

export default DataTable;
