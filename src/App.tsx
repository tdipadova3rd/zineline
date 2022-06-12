import React from 'react';
import './App.css';
import ZetricsLayout from './components/ZetricsLayout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.zora.co/graphql',
  cache: new InMemoryCache()
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ZetricsLayout />
      </div>
    </ApolloProvider>
  );
}

export default App;