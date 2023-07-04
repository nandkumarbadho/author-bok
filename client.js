import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://evolving-warthog-44.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": "t0Y9AsLGDMsXCrjCPPepcPvqNkZ1Yyxd22NA0VK7G941Kx9RvfNMgYcRAbjJ983B",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});
export default client;