import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
import { CandidateListItem } from '../../../core/model';
import { useCandidateAPI } from '../../../api';

export const CandidateListPage: React.FC = () => {
  const api = useCandidateAPI();
  const navigate = useNavigate();
  const [state, setState] = useState<CandidateListItem[] | null>(
    null,
  );

  useEffect(() => {
    api.list.get().then((listItems) => setState(listItems));
  }, []);

  const onListItemClickHandler = (id: string) => () =>
    navigate(`./${id}`);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('new')}
      >
        Add candidate
      </Button>
      <List>
        <Stack spacing={1}>
          {!state && (
            <>
              <Skeleton variant="rectangular" height={72} />
              <Skeleton variant="rectangular" height={72} />
              <Skeleton variant="rectangular" height={72} />
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
