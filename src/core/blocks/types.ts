// TYPE
export const LAYOUT_BLOCKS = {
  layout: 'layout block',
} as const;

export const DATA_BLOCKS = {
  lineText: 'single line text block',
  description: 'description block',
} as const;

export const BLOCKS = {
  ...LAYOUT_BLOCKS,
  ...DATA_BLOCKS,
} as const;

export type LayoutBlockType = keyof typeof LAYOUT_BLOCKS;
export type DataBlockType = keyof typeof DATA_BLOCKS;
export type BlockType = keyof typeof BLOCKS;

// DATA

export interface LineTextBlockData {
  value: string;
}

export interface DescriptionBlockData {
  title: string;
  description: string;
}

export type BlockTypeToDataMap = {
  ['layout']: null;
  ['lineText']: LineTextBlockData;
  ['description']: DescriptionBlockData;
};
export type BlockDataUnion =
  | LineTextBlockData
  | DescriptionBlockData
  | null;

// DISPLAY OPTIONS
export type BlockDirection = 'horizontal' | 'vertical';
export type BlockAlign = 'start' | 'middle' | 'end';
export interface BlockDisplayOptions {
  contentDirection: BlockDirection;
  contentAlign: BlockAlign;
  flex: string;
  margin: string;
  padding: string;
  color: string;
  backgroundColor: string;
}

// GENERAL
export interface Block<T extends BlockType> {
  id: string;
  type: T;
  dataFieldId: string | null;
  data: BlockTypeToDataMap[T];
  displayOptions: BlockDisplayOptions;
  children: BaseBlock[];
}
export type BaseBlock = Block<BlockType>;
export type LayoutBlock = Block<'layout'>;
export type LineTextBlock = Block<'lineText'>;
export type DescriptionBlock = Block<'description'>;

// TYPE MAPPING
export type BlockTypeMap = {
  [K in BlockType]: Block<K>;
};
