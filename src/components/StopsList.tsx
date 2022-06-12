import { ApolloError } from '@apollo/client';
import { SimpleStopType } from '../queries';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';

const StopsList = ({
  stops,
  error,
  loading,
}: {
  stops: SimpleStopType[] | undefined;
  error: ApolloError | undefined;
  loading: boolean | undefined;
}) => {
  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center' }}>ERROR...</div>;
  }

  return (
    <List sx={{ width: 1 }}>
      {stops &&
        stops.map((stop) => (
          <Box key={stop.gtfsId}>
            <ListItem
              key={stop.gtfsId}
              button
              component={Link}
              to={stop.gtfsId}
            >
              <ListItemText
                primary={stop.name}
                secondary={
                  <Box
                    component={'span'}
                    display="grid"
                    gridTemplateColumns={'repeat(12, 1fr)'}
                  >
                    <Typography
                      gridColumn={'span 6'}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Description: {stop.desc}
                    </Typography>
                    <Typography
                      gridColumn={'span 4'}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Code: {stop.code}
                    </Typography>
                    <Typography
                      gridColumn={'span 2'}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Zone: {stop.zoneId}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
    </List>
  );
};

export default StopsList;
