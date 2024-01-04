import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  StyledBorderBottomBlock,
  StyledFlexAllBlock,
} from '../../../styled';

export interface DataFieldWrapperProps {
  name: string;
  onDelete: () => void;
  children: ReactNode;
}

export const DataFieldWrapper: React.FC<DataFieldWrapperProps> = ({
  name,
  children,
  onDelete,
}) => (
  <StyledBorderBottomBlock>
    <h4>{name}</h4>
    <Stack direction="row" justifyContent="space-between">
      <StyledFlexAllBlock>{children}</StyledFlexAllBlock>
      <div>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Stack>
  </StyledBorderBottomBlock>
);
