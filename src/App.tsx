import { useStopsListQuery } from './queries';
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
  const [executeSearch, { data, error, loading }] = useStopsListQuery();

  // When the search text changes and the length of the string
  // is greater than 0, query the graphql endpoint.
  useEffect(() => {
    searchText.length > 0 &&
      executeSearch({ variables: { stopName: searchText } });
  }, [searchText]);

  return (
    <Box className="content">
      <Typography variant="h4" sx={{ textAlign: 'center', m: 1 }}>
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
                  value={searchText}
                  onChange={(event) => {
                    event.preventDefault();
                    setSearchText(event.target.value);
                  }}
                  sx={{ my: 1 }}
                  fullWidth
                />
                <StopsList
                  stops={data?.stops}
                  error={error}
                  loading={loading}
                />
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
