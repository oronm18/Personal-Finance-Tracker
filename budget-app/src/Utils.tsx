export interface Field {
    id: string;
    display_name: string;
    type: string;
    default: any;
  }

  export function createDynamicType(fields: Field[]): Record<string, any> {
    const typeKeys = fields.reduce((keys, field) => {
      keys[field.id] = field.default;
      return keys;
    }, {} as Record<string, any>);
  
    return typeKeys;
  }

  export const handleNavigate = (path: string) => {
    window.location.href = path; // Navigate and refresh the page
  };