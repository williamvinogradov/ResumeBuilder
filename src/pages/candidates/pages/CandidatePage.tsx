import React, { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  useCandidateAPI,
  useDataFieldsAPI,
  useTemplateAPI,
} from '../../../api';
import {
  TemplateListItem,
  Candidate,
  DEFAULT_CANDIDATE,
  DataField,
  DataFieldListItem,
} from '../../../core/model';
import { AddDataField } from '../components/AddDataField';
import { LineTextBlockDataForm } from '../../../core/blocks/lineText';
import {
  BlockDataUnion,
  DescriptionBlockData,
  LineTextBlockData,
} from '../../../core/blocks/types';
import { DescriptionBlockDataForm } from '../../../core/blocks/description';
import { DataFieldWrapper } from '../components/DataFieldWrapper';
import {
  StyledActionsContainer,
  StyledActionsLeftContainer,
  StyledActionsRightContainer,
} from '../../../styled';

export const CandidatePage: React.FC = () => {
  const templateApi = useTemplateAPI();
  const candidateApi = useCandidateAPI();
  const dataFieldApi = useDataFieldsAPI();
  const navigate = useNavigate();
  const { candidateId } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [templates, setTemplates] = useState<
    TemplateListItem[] | null
  >(null);
  const [dataFields, setDataFields] = useState<
    DataFieldListItem[] | null
  >(null);

  const availableDataFields = useMemo(
    () =>
      dataFields?.filter(({ id }) => !candidate?.dataFields[id]) ??
      [],
    [dataFields, candidate],
  );

  const isNewCandidate = !candidateId || candidateId === 'new';

  useEffect(() => {
    templateApi.list
      .get()
      .then((listItems) => setTemplates(listItems));
  }, []);

  useEffect(() => {
    dataFieldApi.list
      .get()
      .then((listItems) => setDataFields(listItems));
  }, []);

  useEffect(() => {
    if (isNewCandidate) {
      setCandidate(DEFAULT_CANDIDATE);
    } else {
      candidateApi.item
        .get(candidateId)
        .then((data) => setCandidate(data));
    }
  }, []);

  const onCandidateNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCandidate({
      ...candidate!,
      name: event.target.value,
    });
  };

  const onCandidateCvTemplateChangeHandler = (
    event: SelectChangeEvent,
  ) => {
    setCandidate({
      ...candidate!,
      cvTemplateId: event.target.value ?? null,
    });
  };

  const onCandidateDataFieldDataChangeHandler =
    (dataFieldId: string) => (data: BlockDataUnion) => {
      setCandidate({
        ...candidate!,
        dataFields: {
          ...candidate!.dataFields,
          [dataFieldId]: {
            ...candidate!.dataFields[dataFieldId],
            data,
          },
        },
      });
    };

  const onCandidateDataFieldDeleteHandler =
    (dataFieldId: string) => () => {
      const newDataFields = { ...candidate!.dataFields };
      delete newDataFields[dataFieldId];
      setCandidate({
        ...candidate!,
        dataFields: newDataFields,
      });
    };

  const onDataFieldAddHandler = (dataField: DataField) => {
    setCandidate({
      ...candidate!,
      dataFields: {
        ...candidate!.dataFields,
        [dataField.id]: dataField,
      },
    });
  };

  const onDeleteClickHandler = () => {
    candidateApi.item
      .delete(candidate!.id)
      .then(() => navigate('../'));
  };

  const onCancelClickHandler = () => {
    navigate('../');
  };

  const onConfirmClickHandler = () => {
    candidateApi.item.put(candidate!).then(() => navigate('../'));
  };

  const onGenerateCvClickHandler = () => {
    candidateApi.item
      .put(candidate!)
      .then(() => window.open(`/cv/${candidateId}`, '_blank'));
  };

  const renderDataFieldForm = ({
    templateType,
    id,
    data,
  }: DataField) => {
    switch (templateType) {
      case 'lineText':
        return (
          <LineTextBlockDataForm
            data={data as LineTextBlockData}
            onChange={onCandidateDataFieldDataChangeHandler(id)}
          />
        );
      case 'description':
        return (
          <DescriptionBlockDataForm
            data={data as DescriptionBlockData}
            onChange={onCandidateDataFieldDataChangeHandler(id)}
          />
        );
      default:
        throw Error(
          `Unsupported data filed template type ${templateType}`,
        );
    }
  };

  const isReady = !!templates && !!candidate && !!dataFields;

  return (
    <>
      {isReady && (
        <Stack spacing={2}>
          <TextField
            label="Candidate name"
            value={candidate!.name}
            onChange={onCandidateNameChangeHandler}
          />
          <FormControl margin="normal">
            <InputLabel id="candidate-cv-template-select-label">
              CV template
            </InputLabel>
            <Select
              labelId="candidate-cv-template-select-label"
              label="CV template"
              value={candidate!.cvTemplateId ?? undefined}
              onChange={onCandidateCvTemplateChangeHandler}
            >
              {Object.values(templates).map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Candidate data
            </AccordionSummary>
            <AccordionDetails>
              {Object.values(candidate!.dataFields).map(
                (dataField) => (
                  <DataFieldWrapper
                    name={dataField.fieldName}
                    onDelete={onCandidateDataFieldDeleteHandler(
                      dataField.id,
                    )}
                  >
                    {renderDataFieldForm(dataField)}
                  </DataFieldWrapper>
                ),
              )}
              {availableDataFields.length > 0 && (
                <AddDataField
                  availableDataFields={availableDataFields}
                  onDataFieldAdd={onDataFieldAddHandler}
                />
              )}
            </AccordionDetails>
          </Accordion>
          <StyledActionsContainer>
            <StyledActionsLeftContainer>
              {!isNewCandidate && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={onDeleteClickHandler}
                >
                  Delete
                </Button>
              )}
            </StyledActionsLeftContainer>
            <StyledActionsRightContainer>
              <Button onClick={onCancelClickHandler}>Cancel</Button>
              <Button
                variant="outlined"
                onClick={onConfirmClickHandler}
              >
                {isNewCandidate ? 'Save' : 'Update'}
              </Button>
              <Button
                variant="contained"
                onClick={onGenerateCvClickHandler}
              >
                Generate CV
              </Button>
            </StyledActionsRightContainer>
          </StyledActionsContainer>
        </Stack>
      )}
      {!isReady && <Skeleton height={200} />}
    </>
  );
};
