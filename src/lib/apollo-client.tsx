import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://gql.hashnode.com/',
  }),
  cache: new InMemoryCache(),
});

export default client;
