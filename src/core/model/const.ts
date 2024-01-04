import { DataField, Template, Candidate } from './types';
import { DEFAULT_BLOCK_DATA, DEFAULT_BLOCKS } from '../blocks/const';

export const DATA_FIELD_DEFAULT: DataField = {
  id: '',
  fieldName: '',
  templateType: 'lineText',
  data: DEFAULT_BLOCK_DATA.lineText,
};

export const TEMPLATE_DEFAULT: Template = {
  id: '',
  name: 'New template',
  json: JSON.stringify(DEFAULT_BLOCKS.layout),
};

export const DEFAULT_CANDIDATE: Candidate = {
  id: '',
  name: '',
  cvTemplateId: null,
  dataFields: {},
};
