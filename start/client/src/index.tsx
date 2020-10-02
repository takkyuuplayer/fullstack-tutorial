import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/",
  headers: {
    authorization: localStorage.getItem("token")!,
  },
  cache,
});
// cache.writeData({
//   data: {
//     isLoggedIn: !!localStorage.getItem("token"),
//     cartItems: [],
//   },
// });

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);
