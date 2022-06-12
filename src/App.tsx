import { useStopsListQuery } from './queries';
import StopsList from './components/StopsList';
import { useEffect, useState } from 'react';
import StopInformation from './components/StopInformation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [executeSearch, { data, error, loading }] = useStopsListQuery();

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
