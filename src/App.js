import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from './components/BookList'
import AddBook from './components/AddBook'
import AddAuthor from './components/AddAuthor'
import AuthorList from './components/AuthorList'

import './components/Main.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>        
        <div style={{textAlign: 'center'}}>            
          <h1>My Reading List</h1>            
          <AuthorList />    
          <AddBook />
          <AddAuthor />  
          <BookList />   
        </div>
      </ApolloProvider>
    )
  }
}

export default App
