import { ApolloClient, InMemoryCache } from '@apollo/client';

interface GQLClientOptions {
  ssrMode?: boolean;
}

export const client = (options?: GQLClientOptions) =>
  new ApolloClient({
    uri: process.env.GRAPHQL_CLIENT_URL || 'https://azharalifauzi.dev/graphql/',
    cache: new InMemoryCache({}),
    ssrMode: options?.ssrMode,
  });
