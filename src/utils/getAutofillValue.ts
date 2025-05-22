import { FormSchema } from 'types';
import { fetchAutoFillData } from 'services/apiMockService';

export const getAutofillValue = async (
  field: FormSchema['fields'][number],
  values: Record<string, any>
): Promise<any | null> => {
  if (
    field.autofillAPI &&
    field.autofillAPI.inputs.every((input) => values[input])
  ) {
    const params: Record<string, any> = {};
    field.autofillAPI.inputs.forEach((key) => {
      params[key] = values[key];
    });
    const result = await fetchAutoFillData(field.autofillAPI.endpoint, params);
    return (result as any).autofilledValue;
  }
  return null;
}