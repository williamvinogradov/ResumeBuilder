import { createContext } from 'react';
import { BaseBlock } from '../../../core/blocks/types';

export interface TemplateBuilderDialogsContextType {
  showAddChildBlockDialog: (block: BaseBlock) => void;
  showEditBlockDialog: (block: BaseBlock) => void;
  showDeleteBlockDialog: (block: BaseBlock) => void;
}

export const TemplateBuilderDialogsContext =
  createContext<TemplateBuilderDialogsContextType>({
    showAddChildBlockDialog: () => {},
    showEditBlockDialog: () => {},
    showDeleteBlockDialog: () => {},
  });
