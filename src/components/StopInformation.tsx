import { useParams } from 'react-router-dom';
import { useStopQuery } from '../queries';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const StopInformation = () => {
  const params = useParams();
  const { loading, error, data } = useStopQuery(params.stopId);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error || !data) {
    return <div style={{ textAlign: 'center' }}>ERROR...</div>;
  }

  const getAccessibilityInfo = () => {
    switch (data.stop.wheelchairBoarding) {
      case 'POSSIBLE':
        return 'Stop is accessible by wheelchair';

      case 'NOT_POSSIBLE':
        return 'Not accessible by wheelchair';

      case 'NO_INFORMATION':
        return 'No information available';

      default:
        return 'No information available';
    }
  };

  const getDepartureTime = (scheduledDeparture: number, serviceDay: number) => {
    const unixTimestamp = scheduledDeparture + serviceDay;
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <Box>
      <List dense sx={{ width: 1 }}>
        <ListItem>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{`${data.stop.name} - ${data.stop.code}`}</Typography>
                <Typography>Zone: {data.stop.zoneId}</Typography>
              </Box>
            }
            secondary={data.stop.desc}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Coordinates'}
            secondary={`latitude ${data.stop.lat} - longitude ${data.stop.lon}`}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Accessibility'}
            secondary={getAccessibilityInfo()}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Parent Station'}
            secondary={
              data.stop.parentStation
                ? data.stop.parentStation.name
                : 'No parent station'
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Alerts Affecting This Stop'}
            secondary={
              data.stop.alerts.length > 0 ? (
                <Box
                  component="span"
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {data.stop.alerts.map((alert) => (
                    <Box component="span" key={alert.alertUrl}>
                      `${alert.alertDescriptionText}\nRead more at: $
                      {alert.alertUrl}`
                    </Box>
                  ))}
                </Box>
              ) : (
                'None'
              )
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Routes Through This Stop'}
            secondary={
              <Box
                component="span"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                {data.stop.routes.map((route) => (
                  <Box component="span" key={route.gtfsId} sx={{ width: 1 }}>
                    {`${route.shortName} - ${route.mode.toLowerCase()}: ${
                      route.longName
                    }`}
                  </Box>
                ))}
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Next Trips'}
            secondary={
              <Box
                component="span"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                {data.stop.stoptimesWithoutPatterns.map((stopTime) => (
                  <Box component="span" key={stopTime.trip.id}>
                    {`${getDepartureTime(
                      stopTime.scheduledDeparture,
                      stopTime.serviceDay,
                    )}: ${stopTime.trip.route.shortName} - ${
                      stopTime.headsign
                    }`}
                  </Box>
                ))}
              </Box>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default StopInformation;
