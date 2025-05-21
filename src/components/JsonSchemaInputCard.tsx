import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Textarea } from 'components';
import { JsonSchemaInputCardProps } from 'types';

const JsonSchemaInputCard: React.FC<JsonSchemaInputCardProps> = ({
  jsonInput,
  setJsonInput,
}) => {
  return (
    <Card variant='outlined' style={{ marginBottom: 24 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          JSON Form Definition Input
        </Typography>
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
          placeholder='Paste your JSON schema here...'
        />
      </CardContent>
    </Card>
  );
};

export default JsonSchemaInputCard;
