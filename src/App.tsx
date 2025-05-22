import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DynamicFormField, JsonSchemaInputCard } from 'components';
import { FormSchema } from 'types';
import { fetchAutoFillData } from 'services/apiMockService';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setSchema(parsed);
      setFormValues({});
    } catch (e) {
      setSchema(null);
    }
  }, [jsonInput]);

  const handleChange = async (name: string, value: any) => {
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);
    if (!schema) return;

    const newVisibility: Record<string, boolean> = {};
    for (const field of schema.fields) {
      if (field.visibleIf) {
        const [depField, depValue] = Object.entries(field.visibleIf)[0];
        newVisibility[field.name] = newValues[depField] === depValue;
      } else {
        newVisibility[field.name] = true;
      }

      if (
        field.autofillAPI &&
        field.autofillAPI.inputs.every((input) => newValues[input])
      ) {
        const params: Record<string, any> = {};
        field.autofillAPI.inputs.forEach((key) => {
          params[key] = newValues[key];
        });
        const result = await fetchAutoFillData(
          field.autofillAPI.endpoint,
          params
        );
        setFormValues((prev) => ({
          ...prev,
          [field.name]: (result as any).autofilledValue,
        }));
      }
    }
    setVisibleFields(newVisibility);
  };

  const handleSubmit = () => {
    console.log('Submitted Values:', JSON.stringify(formValues));
    alert('Form submitted! Check console for output.');
  };

  return (
    <div style={{ padding: 24 }}>
      <JsonSchemaInputCard jsonInput={jsonInput} setJsonInput={setJsonInput} />
      {schema && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {schema.fields.map((field) => (
            <div key={field.name}>
              <DynamicFormField
                field={field}
                value={formValues[field.name]}
                visible={visibleFields[field.name] !== false}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default App;
