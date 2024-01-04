import React, { useEffect, useState } from 'react';
import { Button, Skeleton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataFieldForm } from '../components/DataFieldForm';
import {
  StyledActionsContainer,
  StyledActionsLeftContainer,
  StyledActionsRightContainer,
} from '../../../styled';
import { DataField, DATA_FIELD_DEFAULT } from '../../../core/model';
import { useDataFieldsAPI } from '../../../api';

export const DataFieldPage: React.FC = () => {
  const api = useDataFieldsAPI();
  const { dataFieldId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<DataField | null>(null);

  const isNewDataField = !dataFieldId || dataFieldId === 'new';

  useEffect(() => {
    if (isNewDataField) {
      setFormState(DATA_FIELD_DEFAULT);
    } else {
      api.item.get(dataFieldId!).then((state) => setFormState(state));
    }
  }, [dataFieldId]);

  const onDataFieldFormChangeHandler = (value: DataField) => {
    setFormState(value);
  };

  const onDeleteClickHandler = () => {
    api.item.delete(dataFieldId!).then(() => navigate('../'));
  };

  const onCancelClickHandler = () => {
    navigate('../');
  };

  const onConfirmClickHandler = () => {
    api.item.put(formState!).then(() => navigate('../'));
  };

  return (
    <>
      {!formState && <Skeleton height={400} />}
      {formState && (
        <form>
          <DataFieldForm
            isNew={isNewDataField}
            formState={formState}
            onChange={onDataFieldFormChangeHandler}
          />
          <StyledActionsContainer>
            <StyledActionsLeftContainer>
              {!isNewDataField && (
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
                variant="contained"
                onClick={onConfirmClickHandler}
              >
                {isNewDataField ? 'Save' : 'Update'}
              </Button>
            </StyledActionsRightContainer>
          </StyledActionsContainer>
        </form>
      )}
    </>
  );
};
