import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter';
import reportWebVitals from './reportWebVitals';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { hasExpired } from './utils';
import { TOKEN_STORAGE_KEY } from './pages/authentication/constants/auth';
import { removeToken } from './pages/authentication/utils';

const FEDERATION_API = "https://dev-federated-graphql-api.omnivoltaic.com/graphql"

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  // const expired = hasExpired(token);
  // if (expired) {
  //   removeToken();
    // if (token) window.location.reload();
  // }
  return token
};
const cache = new InMemoryCache()

const link = createHttpLink({
  uri: FEDERATION_API,
});

export const tokenLink = setContext((_, context) => {
  const authToken = getToken();
  return {
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `Bearer ${authToken}` : null,
      universe: "ECOMMERCE",
    },
  };
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: tokenLink.concat(link),

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    mutate: {},
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
