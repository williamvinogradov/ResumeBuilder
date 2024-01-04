import { v4 as uuidv4 } from 'uuid';
import { CandidateAPI, DataFieldsAPI, TemplateAPI } from './types';
import {
  DataField,
  DataFieldListItem,
  Template,
  Candidate,
} from '../core/model';
import {
  DEFAULT_CANDIDATE_DATA,
  DEFAULT_DATA_FIELD_DATA,
  DEFAULT_TEMPLATE_DATA,
} from './defaultData';

const DATA_FIELDS_KEY = 'data_fields';
const TEMPLATE_KEY = 'templates';
const CANDIDATE_KEY = 'candidate';

export const resetDefaultData = () => {
  window.localStorage.setItem(DATA_FIELDS_KEY, DEFAULT_DATA_FIELD_DATA);
  window.localStorage.setItem(TEMPLATE_KEY, DEFAULT_TEMPLATE_DATA);
  window.localStorage.setItem(CANDIDATE_KEY, DEFAULT_CANDIDATE_DATA);
};

const getData = <T>(key: string): Record<string, T> => {
  const dataFieldsJSON = window.localStorage.getItem(key) ?? '{}';
  return JSON.parse(dataFieldsJSON);
};

const setData = <T>(key: string, data: Record<string, T>) => {
  const dataFieldsJSON = JSON.stringify(data);
  window.localStorage.setItem(key, dataFieldsJSON);
};

export const localStorageDataFieldsAPI: DataFieldsAPI = {
  list: {
    get: () => {
      const data = getData<DataField>(DATA_FIELDS_KEY);
      const listItems: DataFieldListItem[] = Object.values(data).map(
        ({ id, fieldName, templateType }) => ({
          id,
          fieldName,
          templateType,
        }),
      );

      return Promise.resolve(listItems);
    },
  },
  item: {
    get: (id: string) => {
      const data = getData<DataField>(DATA_FIELDS_KEY);
      return Promise.resolve(data[id]);
    },
    put: (dataField: DataField) => {
      const data = getData<DataField>(DATA_FIELDS_KEY);
      const isNew = !data[dataField.id];
      const id = isNew ? uuidv4() : dataField.id;

      data[id] = {
        ...data[id],
        ...dataField,
        id,
      };

      setData<DataField>(DATA_FIELDS_KEY, data);

      return Promise.resolve(true);
    },
    delete: (id: string) => {
      const data = getData<DataField>(DATA_FIELDS_KEY);

      delete data[id];
      setData<DataField>(DATA_FIELDS_KEY, data);

      return Promise.resolve(true);
    },
  },
};

export const localStorageTemplateAPI: TemplateAPI = {
  list: {
    get: () => {
      const data = getData<Template>(TEMPLATE_KEY);
      const templateListItems = Object.values(data).map(
        ({ id, name }) => ({ id, name }),
      );

      return Promise.resolve(templateListItems);
    },
  },
  item: {
    get: (id: string) => {
      const data = getData<Template>(TEMPLATE_KEY);
      return Promise.resolve(data[id]);
    },
    put: (template: Template) => {
      const data = getData<Template>(TEMPLATE_KEY);
      const isNew = !data[template.id];
      const id = isNew ? uuidv4() : template.id;

      data[id] = {
        ...data[id],
        ...template,
        id,
      };

      setData<Template>(TEMPLATE_KEY, data);

      return Promise.resolve(true);
    },
    delete: (id: string) => {
      const data = getData<Template>(TEMPLATE_KEY);

      delete data[id];
      setData<Template>(TEMPLATE_KEY, data);

      return Promise.resolve(true);
    },
  },
};

export const candidateAPI: CandidateAPI = {
  list: {
    get: () => {
      const data = getData<Candidate>(CANDIDATE_KEY);
      const candidateListItems = Object.values(data).map(
        ({ id, name }) => ({ id, name }),
      );

      return Promise.resolve(candidateListItems);
    },
  },
  item: {
    get: (id: string) => {
      const data = getData<Candidate>(CANDIDATE_KEY);
      return Promise.resolve(data[id]);
    },
    put: (candidate: Candidate) => {
      const data = getData<Candidate>(CANDIDATE_KEY);
      const isNew = !data[candidate.id];
      const id = isNew ? uuidv4() : candidate.id;

      data[id] = {
        ...data[id],
        ...candidate,
        id,
      };

      setData<Candidate>(CANDIDATE_KEY, data);

      return Promise.resolve(true);
    },
    delete: (id: string) => {
      const data = getData<Candidate>(CANDIDATE_KEY);

      delete data[id];
      setData<Candidate>(CANDIDATE_KEY, data);

      return Promise.resolve(true);
    },
  },
};
