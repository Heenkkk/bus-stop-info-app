import { useStopsListQuery, SimpleStopType } from './queries';
import StopsList from './components/StopsList';
import { useEffect, useState } from 'react';
import StopInformation from './components/StopInformation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

/**
 * The application component.
 *
 * @returns The rendered application.
 */
const App = () => {
  // Search text as a local state.
  const [searchText, setSearchText] = useState('');
  // Lazy query to execute graphql queries. Should be called
  // every time when the contents of the search text changes.
  const [executeSearch, { error, loading }] = useStopsListQuery();
  // Local state for storing the stops. Used for filtering results.
  const [stops, setStops] = useState<SimpleStopType[]>([]);

  // When the search text changes and the length of the string
  // is greater than 0, query the graphql endpoint.
  useEffect(() => {
    searchText.length > 0 &&
      executeSearch({
        variables: { stopName: searchText },
        onCompleted: (data) =>
          setStops(data.stops.filter((stop) => stop.vehicleMode === 'BUS')),
      });
  }, [searchText]);

  return (
    <Box className="content">
      <Typography
        data-testid="application-title"
        variant="h4"
        sx={{ textAlign: 'center', m: 1 }}
      >
        Bus Stop Information App
      </Typography>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TextField
                  id="search-stops"
                  data-testid="search-stops"
                  value={searchText}
                  placeholder="Search for stop names"
                  onChange={(event) => {
                    event.preventDefault();
                    setSearchText(event.target.value);
                  }}
                  sx={{ my: 1 }}
                  fullWidth
                />
                <StopsList stops={stops} error={error} loading={loading} />
              </>
            }
          />
          <Route path="/:stopId" element={<StopInformation />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
