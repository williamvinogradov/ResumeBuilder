import React, { ReactNode, useMemo, useState } from 'react';

import { EditBlockDialog } from './EditBlockDialog';
import {
  TemplateBuilderDialogsContext,
  TemplateBuilderDialogsContextType,
} from '../contexts';
import { DeleteBlockDialog } from './DeleteBlockDialog';
import { BaseBlock } from '../../../core/blocks/types';
import { DEFAULT_BLOCKS } from '../../../core/blocks/const';

interface TemplateBuilderDialogsProps {
  onAddChildBlock: (parentId: string, block: BaseBlock) => void;
  onUpdateBlock: (block: BaseBlock) => void;
  onDeleteBlock: (blockId: string) => void;
  children: ReactNode;
}

enum DialogType {
  addChildBlock = 'addChildBlock',
  editBlock = 'editBlock',
  deleteBlock = 'deleteBlock',
  none = '',
}

export const TemplateBuilderDialogs: React.FC<
  TemplateBuilderDialogsProps
> = ({ children, onAddChildBlock, onUpdateBlock, onDeleteBlock }) => {
  const [currentBlock, setCurrentBlock] = useState<BaseBlock | null>(
    null,
  );
  const [dialogType, setDialogType] = useState(DialogType.none);

  const context: TemplateBuilderDialogsContextType = useMemo(
    () => ({
      showAddChildBlockDialog: (block: BaseBlock) => {
        setCurrentBlock(block);
        setDialogType(DialogType.addChildBlock);
      },
      showEditBlockDialog: (block: BaseBlock) => {
        setCurrentBlock(block);
        setDialogType(DialogType.editBlock);
      },
      showDeleteBlockDialog: (block: BaseBlock) => {
        setCurrentBlock(block);
        setDialogType(DialogType.deleteBlock);
      },
    }),
    [],
  );

  const onDialogClose = () => {
    setDialogType(DialogType.none);
    setCurrentBlock(null);
  };

  const onBlockChildDialogConfirm = (newBlock: BaseBlock) => {
    if (currentBlock) {
      onAddChildBlock(currentBlock.id, newBlock);
    }

    onDialogClose();
  };

  const onBlockEditDialogConfirm = (updatedBlock: BaseBlock) => {
    onUpdateBlock(updatedBlock);
    onDialogClose();
  };

  const onBlockDeleteDialogConfirm = () => {
    if (currentBlock) {
      onDeleteBlock(currentBlock.id);
    }

    onDialogClose();
  };

  const renderDialog = (block: BaseBlock | null) => {
    if (!block) {
      return null;
    }

    switch (dialogType) {
      case DialogType.addChildBlock:
        return (
          <EditBlockDialog
            block={DEFAULT_BLOCKS.layout}
            open
            title="Add child block"
            confirmText="Create"
            onClose={onDialogClose}
            onConfirm={onBlockChildDialogConfirm}
          />
        );
      case DialogType.editBlock:
        return (
          <EditBlockDialog
            block={block}
            open
            title="Edit block"
            confirmText="Save"
            onClose={onDialogClose}
            onConfirm={onBlockEditDialogConfirm}
          />
        );
      case DialogType.deleteBlock:
        return (
          <DeleteBlockDialog
            open
            title="Delete block"
            confirmText="Delete"
            onClose={onDialogClose}
            onConfirm={onBlockDeleteDialogConfirm}
          />
        );
      default:
        throw Error(`Unsupported dialog type ${dialogType}`);
    }
  };

  return (
    <>
      {renderDialog(currentBlock)}
      <TemplateBuilderDialogsContext.Provider value={context}>
        {children}
      </TemplateBuilderDialogsContext.Provider>
    </>
  );
};
