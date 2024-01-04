import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { StyledFormContainer } from '../../../styled';
import { DescriptionBlockData } from '../types';

export interface DescriptionBlockDataFormProps {
  data: DescriptionBlockData;
  onChange: (formState: DescriptionBlockData) => void;
}

export const DESCRIPTION_DEFAULT_FORM_STATE: DescriptionBlockData = {
  title: '',
  description: '',
};

export const DescriptionBlockDataForm: React.FC<
DescriptionBlockDataFormProps
> = ({ data, onChange }) => {
  const onFormControlChangeHandler = (key: keyof DescriptionBlockData) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({
      ...data,
      [key]: event.target.value,
    });
  };

  return (
    <StyledFormContainer>
      <FormControl>
        <TextField
          label="Title"
          margin="normal"
          value={data.title}
          onChange={onFormControlChangeHandler('title')}
        />
      </FormControl>
      <FormControl>
        <TextField
          multiline
          label="Value"
          margin="normal"
          minRows={4}
          value={data.description}
          onChange={onFormControlChangeHandler('description')}
        />
      </FormControl>
    </StyledFormContainer>
  );
};
