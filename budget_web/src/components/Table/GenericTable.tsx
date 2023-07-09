import React from 'react';
import DataTable from './DataTable';
import { Fields, createDynamicTypeExport } from './DynamicType';

interface GenericTableProps {
  fields: Fields;
  currentUserId: string;
  setTotal: any;
  itemType: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ fields, currentUserId, setTotal, itemType }) => {
  const keys = fields.map((field) => field.id);

  return (
    <DataTable
      itemType={itemType}
      headers={keys}
      fields={fields}
      defaultItem={createDynamicTypeExport(fields)}
      currentUserId={currentUserId}
      idFieldId='item_id'
      setTotal={setTotal}
    />
  );
};

export default GenericTable;
