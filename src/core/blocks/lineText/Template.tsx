import React from 'react';
import { BlockTemplateLayout } from '../common';
import { LineTextBlock } from '../types';
import { LineTextBlockPreview } from './Preview';

export interface LayoutBlockEditProps {
  block: LineTextBlock;
  onAddClick: (block: LineTextBlock) => void;
  onEditClick: (block: LineTextBlock) => void;
  onDeleteClick: (block: LineTextBlock) => void;
}

export const LineTextBlockTemplate: React.FC<
  LayoutBlockEditProps
> = ({ block, onAddClick, onEditClick, onDeleteClick }) => {
  return (
    <BlockTemplateLayout
      displayOptions={block.displayOptions}
      hideAddAction
      onAddClick={() => onAddClick(block)}
      onEditClick={() => onEditClick(block)}
      onDeleteClick={() => onDeleteClick(block)}
    >
      <LineTextBlockPreview data={block.data} />
    </BlockTemplateLayout>
  );
};
