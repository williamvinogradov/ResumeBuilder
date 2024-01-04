import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { StyledFormContainer } from '../../../styled';
import { LineTextBlockData } from '../types';

export interface LineTextBlockDataFormProps {
  data: LineTextBlockData;
  onChange: (formState: LineTextBlockData) => void;
}

export const LINE_TEXT_DEFAULT_FORM_STATE: LineTextBlockData = {
  value: '',
};

export const LineTextBlockDataForm: React.FC<
  LineTextBlockDataFormProps
> = ({ data, onChange }) => {
  const onValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formStateValue = {
      value: event.target.value,
    };
    onChange(formStateValue);
  };

  return (
    <StyledFormContainer>
      <FormControl>
        <TextField
          label="Value"
          margin="normal"
          value={data.value}
          onChange={onValueChangeHandler}
        />
      </FormControl>
    </StyledFormContainer>
  );
};
