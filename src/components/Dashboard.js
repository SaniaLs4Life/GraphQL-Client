import React, { Component } from 'react';

import BookList from './BookList';
import AddBook from './AddBook';
import AddAuthor from './AddAuthor';
import AuthorList from './AuthorList';
import Cookies from 'universal-cookie';

import './Main.css';
const cookies = new Cookies();
class Dashboard extends Component { 
    componentDidMount() {
        if(!localStorage.getItem('token')) {
            this.props.history.push('/signin');
        }
    }
    render() {
        return (
            <div>
                <h1 style={{marginTop: '15px'}}>My Reading List <br />GraphQL - ReactJS - ExpressJS - MongoDB</h1>            
                <AuthorList />    
                <AddBook />
                <AddAuthor />  
                <BookList />  
            </div>
        )
    }
}

export default Dashboard;