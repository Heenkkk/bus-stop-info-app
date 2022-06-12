import { useStopsQuery } from './queries';
import StopsList from './components/StopsList';
import { useEffect, useState } from 'react';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [executeSearch, { data, error, loading }] = useStopsQuery();

  useEffect(() => {
    searchText.length > 0 &&
      executeSearch({ variables: { stopName: searchText } });
  }, [searchText]);

  return (
    <div className="content">
      <h1 style={{ textAlign: 'center' }}>React App</h1>
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
      <StopsList stops={data?.stops} error={error} loading={loading} />
    </div>
  );
};

export default App;
