import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { TemplateBuilder } from '../components/TemplateBuilder';
import { useTemplateAPI } from '../../../api';
import {
  TemplateTree,
  Template,
  TEMPLATE_DEFAULT,
} from '../../../core/model';
import {
  StyledActionsContainer,
  StyledActionsLeftContainer,
  StyledActionsRightContainer,
} from '../../../styled';

export const TemplatePage: React.FC = () => {
  const api = useTemplateAPI();
  const navigate = useNavigate();
  const { templateId } = useParams();
  // const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [templateTree, setTemplateTree] = useState<TemplateTree | null>(null);

  const isNewTemplate = !templateId || templateId === 'new';

  useEffect(() => {
    if (isNewTemplate) {
      setTemplate(TEMPLATE_DEFAULT);
      setTemplateTree(TemplateTree.fromJSON(TEMPLATE_DEFAULT.json));
    } else {
      api.item.get(templateId).then((templateValue) => {
        setTemplate(templateValue);
        setTemplateTree(TemplateTree.fromJSON(templateValue.json));
      });
    }
  }, [templateId]);

  const onTemplateNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTemplate({
      ...template!,
      name: event.target.value,
    });
  };

  const onDeleteClickHandler = () => {
    api.item.delete(templateId!).then(() => navigate('../'));
  };

  const onCancelClickHandler = () => {
    navigate('../');
  };

  const onConfirmClickHandler = () => {
    api.item
      .put({
        ...template!,
        json: templateTree!.toJSON(),
      })
      .then(() => navigate('../'));
  };

  return (
    <>
      {!template || (!templateTree && <Skeleton height={400} />)}
      {template && templateTree && (
        <>
          <Stack direction="row">
            <FormControl>
              <TextField
                type="text"
                label="Template name"
                margin="normal"
                value={template.name}
                onChange={onTemplateNameChangeHandler}
              />
            </FormControl>
          </Stack>
          <TemplateBuilder templateModel={templateTree} />
          <StyledActionsContainer>
            <StyledActionsLeftContainer>
              {!isNewTemplate && (
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
                {isNewTemplate ? 'Save' : 'Update'}
              </Button>
            </StyledActionsRightContainer>
          </StyledActionsContainer>
        </>
      )}
    </>
  );
};
