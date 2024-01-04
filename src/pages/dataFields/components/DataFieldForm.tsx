import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { DEFAULT_BLOCK_DATA } from '../../../core/blocks/const';
import {
  DATA_BLOCKS,
  DataBlockType,
  BlockDataUnion,
  DescriptionBlockData,
  LineTextBlockData,
} from '../../../core/blocks/types';
import {
  LineTextBlockDataForm,
  LineTextBlockPreview,
} from '../../../core/blocks/lineText';
import {
  DescriptionBlockDataForm,
  DescriptionBlockPreview,
} from '../../../core/blocks/description';
import { DataField } from '../../../core/model';
import { BlockConfigurationTabs } from '../../../core/blocks/common';

export interface DataFieldFormProps {
  isNew: boolean;
  formState: DataField;
  onChange: (formState: DataField) => void;
}

export const DataFieldForm: React.FC<DataFieldFormProps> = ({
  isNew,
  formState,
  onChange,
}) => {
  const onFieldNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({
      ...formState,
      fieldName: event.target.value,
    });
  };

  const onTemplateTypeChangeHandler = (event: SelectChangeEvent) => {
    const templateType = event.target.value as DataBlockType;
    onChange({
      ...formState,
      templateType,
      data: DEFAULT_BLOCK_DATA[templateType],
    });
  };

  const onTemplatePreviewDataChangeHandler = (
    nestedFormState: BlockDataUnion,
  ) => {
    onChange({
      ...formState,
      data: nestedFormState,
    });
  };

  const renderBlockForm = (type: DataBlockType) => {
    switch (type) {
      case 'lineText':
        const lineTextData = formState.data as LineTextBlockData;
        return (
          <BlockConfigurationTabs
            activeTab="data"
            dataFormElement={
              <LineTextBlockDataForm
                data={lineTextData}
                onChange={onTemplatePreviewDataChangeHandler}
              />
            }
            previewElement={
              <LineTextBlockPreview data={lineTextData} />
            }
          />
        );
      case 'description':
        const descriptionData =
          formState.data as DescriptionBlockData;
        return (
          <BlockConfigurationTabs
            activeTab="data"
            dataFormElement={
              <DescriptionBlockDataForm
                data={descriptionData}
                onChange={onTemplatePreviewDataChangeHandler}
              />
            }
            previewElement={
              <DescriptionBlockPreview data={descriptionData} />
            }
          />
        );
      default:
        throw Error(`Unsupported data block ${type}`);
    }
  };

  return (
    <>
      <h2>{isNew ? 'Create new' : 'Edit'} data block:</h2>
      <Stack direction="column" spacing={2} marginTop={2}>
        <TextField
          type="text"
          label="Block name"
          margin="normal"
          value={formState.fieldName}
          onChange={onFieldNameChangeHandler}
        />
        <FormControl margin="normal">
          <InputLabel id="field-template-type-select">
            Block template type
          </InputLabel>
          <Select
            labelId="field-template-type-select"
            label="Field template type"
            value={formState.templateType}
            onChange={onTemplateTypeChangeHandler}
          >
            {Object.entries(DATA_BLOCKS).map(
              ([blockType, blockDescription]) => (
                <MenuItem key={blockType} value={blockType}>
                  {blockDescription}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
        <h3>Preview data:</h3>
        {renderBlockForm(formState.templateType)}
      </Stack>
    </>
  );
};
