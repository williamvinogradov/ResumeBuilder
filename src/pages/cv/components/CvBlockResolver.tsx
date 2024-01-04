import React from 'react';
import {
  BaseBlock,
  DescriptionBlock,
  LineTextBlock,
} from '../../../core/blocks/types';
import { LineTextBlockPreview } from '../../../core/blocks/lineText';
import { DescriptionBlockPreview } from '../../../core/blocks/description';
import { BlockLayout } from '../../../core/blocks/common';

export interface CvBlockResolverProps {
  block: BaseBlock;
}

export const CvBlockResolver: React.FC<CvBlockResolverProps> = ({
  block,
}) => {
  const { type } = block;

  const renderBlock = () => {
    switch (type) {
      case 'layout':
        return block.children.map((childBlock) => (
          <CvBlockResolver key={childBlock.id} block={childBlock} />
        ));
      case 'lineText':
        const lineTextBlock = block as LineTextBlock;
        return <LineTextBlockPreview data={lineTextBlock.data} />;
      case 'description':
        const descriptionBlock = block as DescriptionBlock;
        return (
          <DescriptionBlockPreview data={descriptionBlock.data} />
        );
      default:
        throw Error(`Unsupported block type ${type}`);
    }
  };

  return (
    <BlockLayout displayOptions={block.displayOptions}>
      {renderBlock()}
    </BlockLayout>
  );
};
