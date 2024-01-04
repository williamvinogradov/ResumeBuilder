import React, { ReactNode } from 'react';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { BlockDisplayOptions } from '../types';
import { BlockLayout } from './BlockLayout';

export interface BlockTemplateLayoutProps {
  displayOptions: BlockDisplayOptions;
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  children: ReactNode;
  hideAddAction?: true;
  hideEditAction?: true;
  hideDeleteAction?: true;
}

export const BlockTemplateLayout: React.FC<
BlockTemplateLayoutProps
> = ({
  displayOptions,
  children,
  onAddClick,
  onEditClick,
  onDeleteClick,
  hideAddAction,
  hideEditAction,
  hideDeleteAction,
}) => (
  <Stack
    direction="column"
    sx={{
      border: '2px dashed #d0d0d0',
      margin: '5px',
      flex: displayOptions.flex,
      justifyContent: 'space-between',
    }}
  >
    <Stack
      direction="row"
      justifyContent="end"
      sx={{
        backgroundColor: '#f1f1f1',
      }}
    >
      {!hideAddAction && (
        <IconButton onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      )}
      {!hideEditAction && (
        <IconButton onClick={onEditClick}>
          <EditIcon />
        </IconButton>
      )}
      {!hideDeleteAction && (
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
    <BlockLayout displayOptions={displayOptions}>
      {children}
    </BlockLayout>
  </Stack>
);
