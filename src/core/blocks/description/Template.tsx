import React from 'react';
import { BlockTemplateLayout } from '../common';
import { DescriptionBlockPreview } from './Preview';
import { DescriptionBlock } from '../types';

export interface LayoutBlockEditProps {
  block: DescriptionBlock;
  onAddClick: (block: DescriptionBlock) => void;
  onEditClick: (block: DescriptionBlock) => void;
  onDeleteClick: (block: DescriptionBlock) => void;
}

export const DescriptionBlockTemplate: React.FC<
LayoutBlockEditProps
> = ({
  block, onAddClick, onEditClick, onDeleteClick,
}) => (
  <BlockTemplateLayout
    displayOptions={block.displayOptions}
    hideAddAction
    onAddClick={() => onAddClick(block)}
    onEditClick={() => onEditClick(block)}
    onDeleteClick={() => onDeleteClick(block)}
  >
    <DescriptionBlockPreview data={block.data} />
  </BlockTemplateLayout>
);
