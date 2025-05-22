import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DynamicFormField, JsonSchemaInputCard } from 'components';
import { FormSchema } from 'types';

import { calculateVisibility } from 'utils/calculateVisibility';
import { getAutofillValue } from 'utils/getAutofillValue';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

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

    const newVisibility = calculateVisibility(schema.fields, newValues);

    for (const field of schema.fields) {
      const autofillValue = await getAutofillValue(field, newValues);
      if (autofillValue !== null) {
        setFormValues((prev) => ({ ...prev, [field.name]: autofillValue }));
      }
    }

    setVisibleFields(newVisibility);
  };
  const handleSubmit = () => {
    console.log('Submitted Values:', JSON.stringify(formValues, null, 2));
    alert('Form submitted! Check console for output.');
  };

  const renderFields = (fields: FormSchema['fields']) =>
    fields.map((field) => {
      if (
        field.type === 'Group' &&
        field.fields &&
        visibleFields[field.name] !== false &&
        formValues['userType']
      ) {
        const isVisible = visibleFields[field.name] !== false;
        if (!isVisible) return null;

        return (
          <div key={field.name}>
            <h4>{field.label}</h4>
            {renderFields(field.fields!)}
          </div>
        );
      }

      return (
        <DynamicFormField
          key={field.name}
          field={field}
          value={formValues[field.name]}
          visible={visibleFields[field.name] !== false}
          onChange={handleChange}
        />
      );
    });

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
          {renderFields(schema.fields)}
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default App;
