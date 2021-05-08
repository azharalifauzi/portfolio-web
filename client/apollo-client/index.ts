import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_CLIENT_URL || 'https://azharalifauzi.dev/graphql/',
  cache: new InMemoryCache(),
});
