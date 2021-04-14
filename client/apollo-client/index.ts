import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://api:5000/',
  cache: new InMemoryCache(),
});
