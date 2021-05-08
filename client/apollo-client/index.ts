import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_CLIENT_URL || 'http://graphql:5000',
  cache: new InMemoryCache(),
});
