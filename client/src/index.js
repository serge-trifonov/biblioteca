import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import{ApolloClient,ApolloProvider,InMemoryCache} from '@apollo/client';

const client = new ApolloClient({uri:'http://localhost:5000/graphql',
                                cache: new InMemoryCache({ addTypename: false})
 })

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>,document.getElementById('root'));

