import React from 'react';
import './App.css';
import Home from './Home';
import Movie from './Movie';

import { Switch, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://ion-movies.herokuapp.com/'
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='main'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/detail/:id' component={Movie} />
      </Switch>
    </div>
  </ApolloProvider>
)

export default App;
