import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/Visibility';
import { Field, handleNavigate } from '../../Utils';
import UnifiedDialog from '../Dialog/UnifiedDialog';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
    root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
  },
}));

interface DataTableProps {
  fetchItems: (userId: string) => Promise<any[]>;
  addItem: (userId: string, item: any) => Promise<void>;
  removeItem: (userId: string, item: any) => Promise<void>;
  updateItem: (userId: string, item: any) => Promise<void>;
  headers: string[];
  fields: Field[];
  defaultItem: any;
  currentUserId: string;
  idFieldId: string;
}

const DataTable: React.FC<DataTableProps> = ({ fetchItems, addItem, updateItem, removeItem, headers, fields, defaultItem, currentUserId, idFieldId }) => {
  const classes = useStyles();
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'view' | null>(null);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (selectedItem) {
        switch(dialogType) {
            case 'add':
                setAddItemDialogOpen(true);
                break;
            case 'edit':
                setUpdateDialogOpen(true);
                break;
            case 'view':
                setDetailDialogOpen(true);
                break;
            default:
                break;
        }
    }
}, [selectedItem, dialogType]);

useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const fetchedItems = await fetchItems(currentUserId);
    setItems(fetchedItems);
  };

  const handleAddItem = async (userId: string, item: any) => {
    console.log(item)
    await addItem(userId, item);
    getItems();
  };

  const handleRemoveItem = async (userId: string, item: any) => {
    await removeItem(userId, item);
    getItems();
  };

  const handleUpdateItem = async (userId: string, item: any) => {
    await updateItem(userId, item);
    getItems();
  };

  const handleViewItemDetails = (item: any) => {
    setSelectedItem(item);
    setDialogType('view');
};

const handleUpdateItemDetails = (item: any) => {
    setSelectedItem(item);
    setDialogType('edit');
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
                    <IconButton aria-label="delete" onClick={() => handleRemoveItem(currentUserId, item)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View">
                    <IconButton aria-label="view" onClick={() => handleViewItemDetails(item)}>
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="edit">
                    <IconButton aria-label="edit" onClick={() => {handleUpdateItemDetails(item)}}>
                      <Edit />
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
        <IconButton 
          aria-label="add" 
          onClick={() => {
            setSelectedItem(defaultItem);
            setDialogType('add');
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      </Box>
      <UnifiedDialog
        open={addItemDialogOpen}
        handleClose={() => {
          setAddItemDialogOpen(false);
          setSelectedItem(null);
          setDialogType(null);
        }}
        handleSubmit={handleAddItem}
        item={selectedItem}
        fields={fields}
        idFieldId={idFieldId}
        type={'add'}
        userId={currentUserId}
      />
      <UnifiedDialog
        open={detailDialogOpen}
        handleClose={() => {
          setDetailDialogOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        fields={fields}
        idFieldId={idFieldId} 
        type={'view'}
        userId={currentUserId}
      />
      <UnifiedDialog
          open={updateDialogOpen}
          handleClose={() => {
              setUpdateDialogOpen(false);
              setSelectedItem(null);  // reset selectedItem when closing the dialog
              setDialogType(null);
          }}
          handleSubmit={handleUpdateItem}
          item={selectedItem}
          fields={fields}
          idFieldId={idFieldId}
          type={'edit'} 
          userId={currentUserId}
      />

    </Box>
  );
};

export default DataTable;
