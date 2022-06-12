import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Regular apollo client initialization.
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
});

// Find the root element.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
// Render the application using the ApolloProvider component.
root.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
);
