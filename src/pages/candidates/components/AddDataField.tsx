import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { DataField, DataFieldListItem } from '../../../core/model';
import { DEFAULT_BLOCK_DATA } from '../../../core/blocks/const';

export interface AddDataFieldProps {
  availableDataFields: DataFieldListItem[];
  onDataFieldAdd: (dataField: DataField) => void;
}

export const AddDataField: React.FC<AddDataFieldProps> = ({
  availableDataFields,
  onDataFieldAdd,
}) => {
  const [selectedDataFieldId, setSelectedDataFieldId] =
    useState<string>(availableDataFields[0].id);

  const onDataFieldIdChangeHandler = (event: SelectChangeEvent) => {
    setSelectedDataFieldId(event.target.value);
  };

  useEffect(() => {
    setSelectedDataFieldId(availableDataFields[0].id);
  }, [availableDataFields]);

  const onAddClickHandler = () => {
    const selectedDataField = availableDataFields.find(
      ({ id: itemId }) => itemId === selectedDataFieldId,
    );

    if (selectedDataField) {
      onDataFieldAdd({
        ...selectedDataField,
        data: DEFAULT_BLOCK_DATA[selectedDataField.templateType],
      });
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      margin="20px 0"
    >
      <FormControl margin="normal">
        <InputLabel id="candidate-cv-template-select-label">
          Data field
        </InputLabel>
        <Select
          labelId="candidate-cv-template-select-label"
          label="Data field"
          value={selectedDataFieldId}
          onChange={onDataFieldIdChangeHandler}
        >
          {availableDataFields.map(({ id, fieldName }) => (
            <MenuItem key={id} value={id}>
              {fieldName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <Button variant="contained" onClick={onAddClickHandler}>
          Add
        </Button>
      </div>
    </Stack>
  );
};
