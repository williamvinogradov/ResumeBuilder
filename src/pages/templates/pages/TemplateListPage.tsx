import React, { useEffect, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useTemplateAPI } from '../../../api';
import { TemplateListItem } from '../../../core/model';

export const TemplateListPage: React.FC = () => {
  const api = useTemplateAPI();
  const navigate = useNavigate();

  const [state, setState] = useState<TemplateListItem[] | null>();

  useEffect(() => {
    api.list.get().then((listItems) => setState(listItems));
  }, []);

  const onListItemClickHandler = (id: string) => () => navigate(`./${id}`);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('new')}
      >
        Add CV template
      </Button>
      <List>
        <Stack spacing={1}>
          {!state && (
            <>
              <Skeleton variant="rectangular" height={40} />
              <Skeleton variant="rectangular" height={40} />
              <Skeleton variant="rectangular" height={40} />
            </>
          )}
          {state?.map(({ id, name }) => (
            <ListItem key={id} onClick={onListItemClickHandler(id)}>
              <ListItemButton>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
          {state?.length === 0 && (
            <Stack alignItems="center" justifyContent="center">
              No data
            </Stack>
          )}
        </Stack>
      </List>
    </>
  );
};
