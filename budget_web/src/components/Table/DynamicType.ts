import { createDynamicType, Field } from '../../Utils';

export type Fields = Field[];

export const createDynamicTypeExport = (fields: Fields) => {
  const instance = createDynamicType(fields);
  return instance;
}

export type DynamicType = ReturnType<typeof createDynamicTypeExport>;
