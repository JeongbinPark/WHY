import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
//import ApolloClient ,{ InMemoryCache} from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';

import { createHttpLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink, ApolloProvider } from '@apollo/react-hooks'; //react-apollo 이용하면 에러
//import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({ 
  uri : 'http://localhost:4000',
  credentials : 'include'
});
/*
const authLink = new ApolloLink((operation, forward) => {
  //Retrive the authorization token from local storage
  const token = localStorage.getItem('auth_token');

  //use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      //authorization: "ZGFpc3lAYXBvbGxvZ3JhcGhxbC5jb20=" 
      authorization: token ? `Bearer ${token}` : '',
    }
  });

  //call the next link in the middleware chain
  return forward(operation);
});
*/

const client = new ApolloClient({
  link : new HttpLink({
    headers:{authorization:  "ZGFpc3lAYXBvbGxvZ3JhcGhxbC5jb20="},
     //localStorage.getItem('token')},
    uri : "http://localhost:4000",
  }),
  //uri: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
/*
const client = new ApolloClient({
  uri : 'http://localhost:4000',
  cache: new InMemoryCache()
})
*/
/*
const httpLink = createHttpLink ({
  uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, {headers}) =>{
  const token = localStorage.getItem('token');
  return {
    headers:{
      ...headers,
      //authorization : token ? `Bearer ${token}` : "",
      authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
*/
{/*앱 내 모든 컴포넌트에서 GraphQL API 연동 가능 */}
ReactDOM.render(
  <ApolloProvider client={client}>  
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

/*
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  // StrictMode는 잠재적 문제를 식별해서 경고를 제공해주는 역할을 하고 있다.
  <React.StrictMode>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
