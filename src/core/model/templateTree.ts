import { v4 as uuidv4 } from 'uuid';
import { BaseBlock, LayoutBlock } from '../blocks/types';
import { DataField } from './types';
import { DEFAULT_BLOCK_DATA } from '../blocks/const';

export class TemplateTree {
  constructor(public readonly rootBlock: LayoutBlock) {}

  addChildBlock(parentId: string, newBlock: BaseBlock): boolean {
    const targetBlock = this.findBlock(parentId);
    if (!targetBlock) {
      return false;
    }

    targetBlock.children.push({
      ...newBlock,
      id: uuidv4(),
      children: [],
    });
    return true;
  }

  updateBlock(block: BaseBlock): boolean {
    const parentBlock = this.findBlockParent(block.id);
    if (!parentBlock) {
      return false;
    }

    parentBlock.children = parentBlock.children.map((childBlock) => {
      if (childBlock.id === block.id) {
        return {
          ...childBlock,
          ...block,
        };
      }

      return childBlock;
    });

    return true;
  }

  deleteBlock(id: string): boolean {
    const parentBlock = this.findBlockParent(id);
    if (!parentBlock) {
      return false;
    }

    parentBlock.children = parentBlock.children.filter(
      ({ id: childId }) => childId !== id,
    );
    return true;
  }

  updateLeafsData(dataFields: Record<string, DataField>): void {
    this.updateLeafs(this.rootBlock, dataFields);
  }

  toJSON(): string {
    return JSON.stringify(this.rootBlock);
  }

  static fromJSON(jsonTemplate: string): TemplateTree {
    const parsedTemplate: LayoutBlock = JSON.parse(jsonTemplate);
    return new TemplateTree(parsedTemplate);
  }

  private updateLeafs(
    block: BaseBlock,
    dataFields: Record<string, DataField>,
  ) {
    if (block.dataFieldId) {
      // eslint-disable-next-line no-param-reassign
      block.data = dataFields[block.dataFieldId]
        ? dataFields[block.dataFieldId].data
        : DEFAULT_BLOCK_DATA[block.type];
    }

    block.children.forEach((childBlock) => this.updateLeafs(childBlock, dataFields));
  }

  private findBlock(id: string): BaseBlock | null {
    const result = this.findBlockByIdRecursion(
      id,
      null,
      this.rootBlock,
    );
    return result ? result[1] : null;
  }

  private findBlockParent(id: string): BaseBlock | null {
    const result = this.findBlockByIdRecursion(
      id,
      null,
      this.rootBlock,
    );
    return result ? result[0] : null;
  }

  private findBlockByIdRecursion(
    id: string,
    parentBlock: BaseBlock | null,
    block: BaseBlock,
  ): [parentBlock: BaseBlock | null, targetBlock: BaseBlock] | null {
    const { id: currentBlockId } = block;

    if (currentBlockId === id) {
      return [parentBlock, block];
    }

    for (let idx = 0; idx < block.children.length; idx += 1) {
      const childBlock = block.children[idx];
      const result = this.findBlockByIdRecursion(
        id,
        block,
        childBlock,
      );

      if (result) {
        return result;
      }
    }

    return null;
  }
}
