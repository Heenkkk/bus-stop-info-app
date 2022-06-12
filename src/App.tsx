import { useStopsListQuery } from './queries';
import StopsList from './components/StopsList';
import { useEffect, useState } from 'react';
import StopInformation from './components/StopInformation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [executeSearch, { data, error, loading }] = useStopsListQuery();

  useEffect(() => {
    searchText.length > 0 &&
      executeSearch({ variables: { stopName: searchText } });
  }, [searchText]);

  return (
    <div className="content">
      <h1 style={{ textAlign: 'center' }}>Bus Stop Information App</h1>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <input
                  type="text"
                  name="search"
                  value={searchText}
                  onChange={(event) => {
                    event.preventDefault();
                    setSearchText(event.target.value);
                  }}
                  style={{ display: 'block', margin: '0 auto' }}
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
    </div>
  );
};

export default App;
