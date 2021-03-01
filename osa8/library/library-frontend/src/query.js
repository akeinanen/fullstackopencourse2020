import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
            id
            genres
        }
    }
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            id
            born
            bookCount
        }
    }`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }`

export const EDIT_NUMBER = gql`
    mutation editNumber($author: String!, $setBornTo: String!) {
        editAuthor(
            name: $author,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }`