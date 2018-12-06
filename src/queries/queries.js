import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
{
        authors{
            id
            name
            age
        }
}`

const getBooksQuery = gql`
{
        books{
            name
            id
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

const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            id
            name
        }
    }
`
const deleteAuthorMutation = gql`
    mutation($id: ID!) {
        deleteAuthor(id: $id) {
            id
            name
            age
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

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation, deleteBookMutation, deleteAuthorMutation }