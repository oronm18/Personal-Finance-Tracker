import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { Field } from '../../Utils';

interface AddDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (item: any) => Promise<void>;
  fields: Field[];
  idFieldId: string;
}

const AddDialog: React.FC<AddDialogProps> = ({ open, handleClose, handleSubmit, fields, idFieldId }) => {
  const [item, setItem] = useState<any>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const submitForm = async () => {
    const itemWithId = { ...item, [idFieldId]: "undefined" };
    await handleSubmit(itemWithId);
    handleClose();
  };

  const filteredFields = fields.filter(field => field.id !== idFieldId);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        {filteredFields.map((field) => (
          <TextField
            key={field.id}
            name={field.id}
            label={field.display_name}
            defaultValue={field.default}
            type={field.type}
            onChange={handleChange}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submitForm} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
