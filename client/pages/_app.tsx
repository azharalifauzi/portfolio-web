import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { client } from 'apollo-client';

const theme = extendTheme({
  colors: {
    black: '#333333',
    white: '#ffffff',
    blue: '#1A6FEF',
    grey: {
      1: '#78797A',
      2: '#F0F0F0',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
