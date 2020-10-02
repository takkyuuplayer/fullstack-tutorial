import { resolvers, typeDefs } from "./resolvers";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  HttpLink,
  useQuery,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";
import Login from "./pages/login";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  }),
  typeDefs,
  resolvers,
});
cache.writeQuery({
  query: gql`
    query Initialize {
      isLoggedIn
      cartItems
    }
  `,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: [],
  },
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
