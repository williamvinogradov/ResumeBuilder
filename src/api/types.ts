import {
  DataField,
  DataFieldListItem,
  Template,
  TemplateListItem,
  Candidate,
  CandidateListItem,
} from '../core/model';

export interface DataFieldsAPI {
  list: {
    get(): Promise<DataFieldListItem[]>;
  };
  item: {
    get(id: string): Promise<DataField>;
    put(dataField: DataField): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  };
}

export interface TemplateAPI {
  list: {
    get(): Promise<TemplateListItem[]>;
  };
  item: {
    get(id: string): Promise<Template>;
    put(template: Template): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  };
}

export interface CandidateAPI {
  list: {
    get(): Promise<CandidateListItem[]>;
  };
  item: {
    get(id: string): Promise<Candidate>;
    put(candidate: Candidate): Promise<boolean>;
    delete(id: string): Promise<boolean>;
  };
}
