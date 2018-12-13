import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
{
        authors{
            id
            name
            age
        }
}`

const getAllUsers = gql`
{
    allUsers{
        id
        fullname
        username
        password
    }
}
`

const getBooksQuery = gql`
{
        books{
            id
            name
            author{
                id
                name
                age
            }
        }
}`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name        
            genre    
        }
    }
`
const deleteBookMutation = gql`
    mutation($id: ID!) {
        deleteBook(id: $id) {
            id
        }
    }
`
const addUser = gql`
    mutation($fullname: String!, $username: String!, $password: String!) {
        addUser(fullname: $fullname, username: $username, password: $password) {
            id
            fullname
            username
            password
        }
    }
`

const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            id
            name
            age
        }
    }
`
const deleteAuthorMutation = gql`
    mutation($id: ID!) {
        deleteAuthor(id: $id) {
            id
        }
    }
`

const loginMutation = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            fullname
            username
            password
        }
    } 
`

const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                book {
                    id
                    name
                }
            }
        }
    }
`
const getUserQuery = gql`
    query($username: String!, $password: String!) {
        getUser(username: $username, password: $password) {
            id
            fullname
            username
            password
        }
    }
`

export { 
        getAuthorsQuery, 
        getBooksQuery, 
        addBookMutation, 
        getBookQuery, 
        addAuthorMutation, 
        deleteBookMutation, 
        deleteAuthorMutation, 
        getUserQuery, 
        addUser, 
        getAllUsers ,
        loginMutation
}