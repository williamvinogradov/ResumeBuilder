import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { BlockDisplayOptions } from '../types';
import { StyledFormContainer } from '../../../styled';

export interface BlockOptionsProps {
  options: BlockDisplayOptions;
  onChange: (options: BlockDisplayOptions) => void;
}

export const BlockOptionsForm: React.FC<BlockOptionsProps> = ({
  options,
  onChange,
}) => {
  const onOptionChangeHandler = (key: keyof BlockDisplayOptions) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({
      ...options,
      [key]: event.target.value,
    });
  };

  const onOptionSelectChangeHandler = (key: keyof BlockDisplayOptions) => (
    event: SelectChangeEvent,
  ) => {
    onChange({
      ...options,
      [key]: event.target.value,
    });
  };

  return (
    <StyledFormContainer>
      <FormControl margin="normal">
        <InputLabel id="block-options-content-direction-label">
          Content direction
        </InputLabel>
        <Select
          labelId="block-options-content-direction-label"
          label="Content direction"
          value={options.contentDirection}
          onChange={onOptionSelectChangeHandler('contentDirection')}
        >
          <MenuItem key="vertical" value="vertical">
            vertical
          </MenuItem>
          <MenuItem key="horizontal" value="horizontal">
            horizontal
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="normal">
        <InputLabel id="block-options-content-align-label">
          Content align
        </InputLabel>
        <Select
          labelId="block-options-content-align-label"
          label="Content align"
          value={options.contentAlign}
          onChange={onOptionSelectChangeHandler('contentAlign')}
        >
          <MenuItem key="start" value="start">
            start
          </MenuItem>
          <MenuItem key="middle" value="middle">
            middle
          </MenuItem>
          <MenuItem key="end" value="end">
            end
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          label="Flex (CSS):"
          margin="normal"
          value={options.flex}
          onChange={onOptionChangeHandler('flex')}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Padding (CSS):"
          margin="normal"
          value={options.padding}
          onChange={onOptionChangeHandler('padding')}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Margin (CSS):"
          margin="normal"
          value={options.margin}
          onChange={onOptionChangeHandler('margin')}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Text color (HEX):"
          margin="normal"
          value={options.color}
          onChange={onOptionChangeHandler('color')}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Background color (HEX):"
          margin="normal"
          value={options.backgroundColor}
          onChange={onOptionChangeHandler('backgroundColor')}
        />
      </FormControl>
    </StyledFormContainer>
  );
};
