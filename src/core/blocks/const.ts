import {
  BlockDisplayOptions,
  BlockTypeMap,
  BlockTypeToDataMap,
} from './types';

export const DEFAULT_BLOCK_DATA: BlockTypeToDataMap = {
  layout: null,
  lineText: { value: '' },
  description: { title: '', description: '' },
} as const;

export const DEFAULT_BLOCK_DISPLAY_OPTIONS: BlockDisplayOptions = {
  flex: '0 1',
  contentDirection: 'vertical',
  contentAlign: 'start',
  padding: '0px',
  margin: '0px',
  color: 'inherit',
  backgroundColor: 'inherit',
};

export const DEFAULT_BLOCKS: BlockTypeMap = {
  layout: {
    id: '',
    type: 'layout',
    dataFieldId: null,
    data: DEFAULT_BLOCK_DATA.layout,
    displayOptions: DEFAULT_BLOCK_DISPLAY_OPTIONS,
    children: [],
  },
  lineText: {
    id: '',
    type: 'lineText',
    dataFieldId: null,
    data: DEFAULT_BLOCK_DATA.lineText,
    displayOptions: DEFAULT_BLOCK_DISPLAY_OPTIONS,
    children: [],
  },
  description: {
    id: '',
    type: 'description',
    dataFieldId: null,
    data: DEFAULT_BLOCK_DATA.description,
    displayOptions: DEFAULT_BLOCK_DISPLAY_OPTIONS,
    children: [],
  },
};
