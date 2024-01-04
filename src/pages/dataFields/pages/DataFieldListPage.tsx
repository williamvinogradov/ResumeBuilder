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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDataFieldsAPI } from '../../../api';
import { DataFieldListItem } from '../../../core/model';

const DataFieldListPage: React.FC = () => {
  const api = useDataFieldsAPI();
  const navigate = useNavigate();
  const [state, setState] = useState<DataFieldListItem[] | null>(
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
        Add data block
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
          {state?.map(({ id, fieldName, templateType }) => (
            <ListItem key={id} onClick={onListItemClickHandler(id)}>
              <ListItemButton>
                <ListItemText
                  primary={fieldName}
                  secondary={templateType}
                />
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

export default DataFieldListPage;
