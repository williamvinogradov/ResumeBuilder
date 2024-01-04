import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { BlockResolver } from './BlockResolver';
import { TemplateBuilderDialogs } from './TemplateBuilderDialogs';
import { TemplateTree } from '../../../core/model';
import { BaseBlock } from '../../../core/blocks/types';

const TemplateLayout = styled.div`
  border: 1px solid #333333;
`;

export interface TemplateBuilderProps {
  templateModel: TemplateTree;
}

export const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  templateModel,
}) => {
  const [rootBlock, setRootBlock] = useState(templateModel.rootBlock);

  const methods = useMemo(
    () => ({
      onAddChildBlock: (parentId: string, newBlock: BaseBlock) => {
        templateModel.addChildBlock(parentId, newBlock);
        setRootBlock({ ...rootBlock });
      },
      onUpdateBlock: (updatedBlock: BaseBlock) => {
        templateModel.updateBlock(updatedBlock);
        setRootBlock({ ...rootBlock });
      },
      onDeleteBlock: (blockId: string) => {
        templateModel.deleteBlock(blockId);
        setRootBlock({ ...rootBlock });
      },
    }),
    [templateModel],
  );

  return (
    <TemplateBuilderDialogs
      onAddChildBlock={methods.onAddChildBlock}
      onUpdateBlock={methods.onUpdateBlock}
      onDeleteBlock={methods.onDeleteBlock}
    >
      <TemplateLayout>
        <BlockResolver block={rootBlock} isRoot />
      </TemplateLayout>
    </TemplateBuilderDialogs>
  );
};
