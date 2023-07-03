import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@material-ui/core';
import { Field } from '../../Utils';

interface UnifiedDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit?: (userId: string, item: any) => Promise<void>;
  prepareFunction?: (item: any) => void;
  fields: Field[];
  idFieldId: string;
  item?: any;
  userId: string;
  type: 'add' | 'edit' | 'view';
}

const UnifiedDialog: React.FC<UnifiedDialogProps> = ({
    open, 
    handleClose, 
    handleSubmit, 
    prepareFunction,
    fields, 
    idFieldId, 
    item, 
    userId, 
    type }) => {

  const [dialogItem, setDialogItem] = useState<any>({});
  useEffect(() => {
    if (item) {
      setDialogItem(item);
    }
  }, [item]);

  
  if(prepareFunction){
    console.log(item);
    prepareFunction(item);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = fields.find(field => field.id === event.target.name)?.type === 'number' ? Number(event.target.value) : event.target.value;
    setDialogItem({ ...dialogItem, [event.target.name]: value });
    };

  const submitForm = async () => {
    if (handleSubmit !== undefined) {
        await handleSubmit(userId, dialogItem);
      handleClose();
    }
  };

  const filteredFields = fields.filter(field => field.id !== idFieldId);

  const renderDialogContent = () => {
    switch (type) {
      case 'add':
      case 'edit':
        return (
          filteredFields.map((field) => (
            <TextField
            key={field.id}
            name={field.id}
            label={"Date" !== field.display_name ? field.display_name : " "}
            value={dialogItem[field.id] || ''}
            type={field.type}
            onChange={handleChange}
            fullWidth
            
            />
          ))
        );
      case 'view':
        return (
          item && fields.map((field) => (
            <Typography key={field.id} variant="body1">
              {`${field.display_name}: ${item[field.id]}`}
            </Typography>
          ))
        );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Item</DialogTitle>
      <DialogContent>
        {renderDialogContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary"> { type !== 'view' ? "Cancel" : "Close" } </Button>
        { type !== 'view' && <Button onClick={submitForm} color="primary"> {type} </Button> }
      </DialogActions>
    </Dialog>
  );
};

export default UnifiedDialog;
