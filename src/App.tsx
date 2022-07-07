import './App.css';
import ZetricsLayout from './components/ZetricsLayout';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'degen';
import 'degen/styles';

const client = new ApolloClient({
  uri: 'https://api.zora.co/graphql',
  cache: new InMemoryCache()
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultMode='dark' defaultAccent='purple'>
        <ZetricsLayout />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
