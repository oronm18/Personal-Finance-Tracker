import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { Field } from '../../Utils';

interface DetailDialogProps {
    open: boolean;
    handleClose: () => void;
    item: any;
    fields: Field[];
    idFieldId: string;
  }
  
  const DetailDialog: React.FC<DetailDialogProps> = ({ open, handleClose, item, fields, idFieldId }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent>
          {item && fields.map((field) => (
            <Typography key={field.id} variant="body1">
              {`${field.display_name}: ${item[field.id]}`}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DetailDialog;