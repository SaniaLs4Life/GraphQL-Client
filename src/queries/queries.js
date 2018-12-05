import { gql } from 'apollo-boost'

const getAuthorsQuery = gql`
{
        authors{
            id
            name
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
const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            id
            name
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
                    name
                    id
                }
            }
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation }