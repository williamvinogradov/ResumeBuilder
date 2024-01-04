import React, { useContext } from 'react';
import {
  BaseBlock,
  DescriptionBlock,
  LayoutBlock,
  LineTextBlock,
} from '../../../core/blocks/types';
import { LayoutBlockEdit } from '../../../core/blocks/layout';
import { TemplateBuilderDialogsContext } from '../contexts';
import { LineTextBlockTemplate } from '../../../core/blocks/lineText';
import { DescriptionBlockTemplate } from '../../../core/blocks/description';

export interface BlockResolverProps {
  block: BaseBlock;
  isRoot?: true;
}

export const BlockResolver: React.FC<BlockResolverProps> = ({
  block,
  isRoot,
}) => {
  const {
    showAddChildBlockDialog,
    showEditBlockDialog,
    showDeleteBlockDialog,
  } = useContext(TemplateBuilderDialogsContext);

  const { type } = block;
  switch (type) {
    case 'layout':
      const layoutBlock = block as LayoutBlock;
      return (
        <LayoutBlockEdit
          isRoot={isRoot}
          block={layoutBlock}
          onAddClick={showAddChildBlockDialog}
          onEditClick={showEditBlockDialog}
          onDeleteClick={showDeleteBlockDialog}
        >
          {layoutBlock.children.map((childBlock) => (
            <BlockResolver key={childBlock.id} block={childBlock} />
          ))}
        </LayoutBlockEdit>
      );
    case 'lineText':
      const lineTextBlock = block as LineTextBlock;
      return (
        <LineTextBlockTemplate
          block={lineTextBlock}
          onAddClick={showAddChildBlockDialog}
          onEditClick={showEditBlockDialog}
          onDeleteClick={showDeleteBlockDialog}
        />
      );
    case 'description':
      const descriptionBlock = block as DescriptionBlock;
      return (
        <DescriptionBlockTemplate
          block={descriptionBlock}
          onAddClick={showAddChildBlockDialog}
          onEditClick={showEditBlockDialog}
          onDeleteClick={showDeleteBlockDialog}
        />
      );
    default:
      throw Error(`Unsupported block type ${type}`);
  }
};
