import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// do these go in?
// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient from 'apollo-boost';
// or these
// import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

let httpLink = createHttpLink({
  //  uri: 'https://book-project-app-demo.herokuapp.com/graphql',
   uri: 'http://localhost:3001/graphql',
});
const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
httpLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: httpLink,
  // uri: '/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
    
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ ApolloProvider>
  );
}

export default App;
