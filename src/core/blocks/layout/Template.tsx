import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { LayoutBlock } from '../types';
import { BlockTemplateLayout } from '../common';
import { StyledLayoutBlockTemplateEmpty } from '../../../styled';

export interface LayoutBlockEditProps {
  block: LayoutBlock;
  children: ReactNode[];
  onAddClick: (block: LayoutBlock) => void;
  onEditClick: (block: LayoutBlock) => void;
  onDeleteClick: (block: LayoutBlock) => void;
  isRoot?: true;
}

export const LayoutBlockEdit: React.FC<LayoutBlockEditProps> = ({
  block,
  onAddClick,
  onEditClick,
  onDeleteClick,
  children,
  isRoot,
}) => (isRoot ? (
  <>
    {children.length < 1 && (
    <StyledLayoutBlockTemplateEmpty>
      <Button onClick={() => onAddClick(block)}>Add block</Button>
    </StyledLayoutBlockTemplateEmpty>
    )}
    {children}
  </>
) : (
  <BlockTemplateLayout
    displayOptions={block.displayOptions}
    onAddClick={() => onAddClick(block)}
    onEditClick={() => onEditClick(block)}
    onDeleteClick={() => onDeleteClick(block)}
  >
    {children.length < 1 && (
    <StyledLayoutBlockTemplateEmpty>
      Press &quot;+&quot; to add content
    </StyledLayoutBlockTemplateEmpty>
    )}
    {children.length > 0 && children}
  </BlockTemplateLayout>
));
