import { BlockDataUnion, DataBlockType } from '../blocks/types';

export interface DataFieldListItem {
  id: string;
  fieldName: string;
  templateType: DataBlockType;
}

export interface DataField {
  id: string;
  fieldName: string;
  templateType: DataBlockType;
  data: BlockDataUnion;
}

export interface TemplateListItem {
  id: string;
  name: string;
}

export interface Template {
  id: string;
  name: string;
  json: string;
}

export interface CandidateListItem {
  id: string;
  name: string;
}

export interface Candidate {
  id: string;
  name: string;
  cvTemplateId: string | null;
  dataFields: Record<string, DataField>;
}
