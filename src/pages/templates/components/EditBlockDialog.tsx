import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';
import { BaseBlock } from '../../../core/blocks/types';
import { EditBlockDialogDataForm } from './EditBlockDialogDataForm';
import { BlockOptionsForm } from '../../../core/blocks/common';

export type TabsType = 'data' | 'options';

export interface EditBlockDataDialogProps {
  block: BaseBlock;
  open: boolean;
  title: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: (newBlock: BaseBlock) => void;
}

export const EditBlockDialog: React.FC<EditBlockDataDialogProps> = ({
  block,
  open,
  title,
  confirmText,
  onClose,
  onConfirm,
}) => {
  const [activeTab, setActiveTab] = useState<TabsType>('data');
  const [state, setState] = useState(block);

  const onActiveTabChangeHandler = (
    _: React.SyntheticEvent,
    newValue: TabsType,
  ) => {
    setActiveTab(newValue);
  };

  const onBlockPropChangeHandler = <T extends unknown>(propName: keyof BaseBlock) => (value: T) => {
    setState((prevState) => ({
      ...prevState,
      [propName]: value,
    }));
  };

  const onConfirmHandler = () => {
    onConfirm(state);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 200 }}>
          <Tabs
            value={activeTab}
            onChange={onActiveTabChangeHandler}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Block data" value="data" />
            <Tab label="Display options" value="options" />
          </Tabs>

          <div hidden={activeTab !== 'data'}>
            <EditBlockDialogDataForm
              blockType={state.type}
              dataFieldId={state.dataFieldId}
              onBlockTypeChange={onBlockPropChangeHandler('type')}
              onDataFieldIdChane={onBlockPropChangeHandler(
                'dataFieldId',
              )}
              onPreviewDataChange={onBlockPropChangeHandler('data')}
            />
          </div>
          <div hidden={activeTab !== 'options'}>
            <BlockOptionsForm
              options={state.displayOptions}
              onChange={onBlockPropChangeHandler('displayOptions')}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirmHandler}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
