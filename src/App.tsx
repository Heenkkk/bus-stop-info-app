import { useEffect, useState } from 'react';

const App = () => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    searchText.length > 0 && console.log(searchText);
  }, [searchText]);

  return (
    <div className="content">
      <h1 style={{ textAlign: 'center' }}>React App</h1>
      <input
        type="text"
        name="search"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        style={{ display: 'block', margin: '0 auto' }}
      />
    </div>
  );
};

export default App;
