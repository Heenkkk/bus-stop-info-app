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
import PropTypes from 'prop-types';

/**
 * Lists the stops that have been queried using graphql.
 *
 * @param stops The list of stops that were queried.
 * @param error ApolloError describing possible errors during query.
 * @param loading Boolean describing whether the query is loading.
 *
 * @returns The rendered list of stops.
 */
const StopsList = ({
  stops,
  error,
  loading,
}: {
  stops: SimpleStopType[] | undefined;
  error: ApolloError | undefined;
  loading: boolean | undefined;
}) => {
  // If the query is loading, return some text.
  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  // If there was an error, return some text.
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

StopsList.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      gtfsId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      zoneId: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }),
  ),
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default StopsList;
