import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
} from '@mui/material';
import { DataField, DataFieldListItem } from '../../../core/model';
import { useDataFieldsAPI } from '../../../api';
import { LineTextBlockPreview } from '../../../core/blocks/lineText';
import { DescriptionBlockPreview } from '../../../core/blocks/description';
import {
  BlockDataUnion,
  BlockType,
  DescriptionBlockData,
  LineTextBlockData,
} from '../../../core/blocks/types';

export type BlockGroup = 'layout' | 'data';

export interface EditBLockDialogDataFormProps {
  blockType: BlockType;
  dataFieldId: string | null;
  onBlockTypeChange: (blockType: BlockType) => void;
  onDataFieldIdChane: (dataFieldId: string | null) => void;
  onPreviewDataChange: (previewData: BlockDataUnion) => void;
}

export const EditBlockDialogDataForm: React.FC<
EditBLockDialogDataFormProps
> = ({
  blockType,
  dataFieldId,
  onBlockTypeChange,
  onDataFieldIdChane,
  onPreviewDataChange,
}) => {
  const api = useDataFieldsAPI();
  const [blockGroup, setBlockGroup] = useState<BlockGroup>(
    blockType === 'layout' ? 'layout' : 'data',
  );
  const [dataFieldList, setDataFieldList] = useState<
  DataFieldListItem[] | null
  >(null);
  const [selectedDataFieldId, setSelectedDataFieldId] = useState<
  string | null
  >(dataFieldId);
  const [dataField, setDataField] = useState<DataField | null>(null);

  const onBlockGroupChangeHandler = (event: SelectChangeEvent) => {
    setBlockGroup(event.target.value as BlockGroup);
  };

  const onBlockDataFieldChangeHandler = (
    event: SelectChangeEvent,
  ) => {
    setSelectedDataFieldId(event.target.value);
  };

  useEffect(() => {
    if (blockGroup === 'data') {
      api.list.get().then((dataFields) => {
        setDataFieldList(dataFields);

        if (!selectedDataFieldId) {
          const [{ id }] = dataFields;
          setSelectedDataFieldId(id);
        }
      });
    } else {
      setDataFieldList(null);
      setSelectedDataFieldId(null);
    }
  }, [blockGroup]);

  useEffect(() => {
    if (selectedDataFieldId) {
      api.item.get(selectedDataFieldId).then((data) => {
        setDataField(data);
      });
    } else {
      setDataField(null);
    }
  }, [selectedDataFieldId]);

  useEffect(() => {
    const type = blockGroup === 'layout'
      ? 'layout'
      : dataField?.templateType ?? 'layout';

    onBlockTypeChange(type);
  }, [blockGroup, dataField]);

  useEffect(() => {
    onDataFieldIdChane(selectedDataFieldId);
  }, [selectedDataFieldId]);

  useEffect(() => {
    onPreviewDataChange(dataField?.data ?? null);
  }, [dataField]);

  const renderPreview = (dataFieldValue: DataField) => {
    const { templateType, data } = dataFieldValue;
    switch (templateType) {
      case 'lineText':
        return (
          <LineTextBlockPreview data={data as LineTextBlockData} />
        );
      case 'description':
        return (
          <DescriptionBlockPreview
            data={data as DescriptionBlockData}
          />
        );
      default:
        throw Error(
          `Unsupported data field template ${templateType}`,
        );
    }
  };

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="block-edit-dialog-select-block-type-label">
          Block group
        </InputLabel>
        <Select
          labelId="block-edit-dialog-select-block-type-label"
          label="Block group"
          value={blockGroup}
          onChange={onBlockGroupChangeHandler}
        >
          <MenuItem key="layout" value="layout">
            layout block
          </MenuItem>
          <MenuItem key="data" value="data">
            data blocks
          </MenuItem>
        </Select>
      </FormControl>
      {blockGroup === 'data' && !dataFieldList && (
        <Stack spacing={1}>
          <Skeleton height={60} />
          <Skeleton height={200} />
        </Stack>
      )}
      {blockGroup === 'data'
        && dataFieldList
        && selectedDataFieldId && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="block-edit-dialog-select-data-field-label">
              Data field
            </InputLabel>
            <Select
              labelId="block-edit-dialog-select-data-field-label"
              label="Data field"
              value={selectedDataFieldId}
              onChange={onBlockDataFieldChangeHandler}
            >
              {dataFieldList.map(({ id, fieldName }) => (
                <MenuItem key={id} value={id}>
                  {fieldName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      )}
      {blockGroup === 'data' && dataField && (
        <>
          <h4>Preview:</h4>
          {renderPreview(dataField)}
        </>
      )}
    </>
  );
};
