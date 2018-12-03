import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from './components/BookList'
import AddBook from './components/AddBook'
import './components/Main.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>        
        <div style={{textAlign: 'center'}}>          
        <AddBook />
          <h1>My Reading List</h1>    
                <BookList />   
        </div>
      </ApolloProvider>
    )
  }
}

export default App
