import { FormSchema } from 'types';

export const calculateVisibility = (
  fields: FormSchema['fields'],
  values: Record<string, any>
): Record<string, boolean> => {
  const visibility: Record<string, boolean> = {};
  for (const field of fields) {
    if (field.visibleIf) {
      const [depField, depValue] = Object.entries(field.visibleIf)[0];
      visibility[field.name] = values[depField] === depValue;
    } else {
      visibility[field.name] = true;
    }
  }
  return visibility;
}