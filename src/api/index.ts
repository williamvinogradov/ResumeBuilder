import { CandidateAPI, DataFieldsAPI, TemplateAPI } from './types';
import {
  candidateAPI,
  localStorageDataFieldsAPI,
  localStorageTemplateAPI,
} from './localStorageAPI';

export type { CandidateAPI, DataFieldsAPI, TemplateAPI };

export const useDataFieldsAPI = (): DataFieldsAPI => localStorageDataFieldsAPI;
export const useTemplateAPI = (): TemplateAPI => localStorageTemplateAPI;
export const useCandidateAPI = (): CandidateAPI => candidateAPI;
export { resetDefaultData } from './localStorageAPI';
