import { useQuery, gql } from '@apollo/client';

const GET_ALL_AUTHORS = gql`
    query GET_ALL_AUTHORS {
        author_author {
          id
          name
          Age
        }
      }
`;
const GET_ALL_BOOKS = gql`
    query GET_ALL_BOOKS {
      book_book{
        id 
        name
      }
    }
`;
const GET_DETAILS_OF_AUTHOR = gql`    
  query GET_AUTHOR_BY_ID($id: String!){
      author_author(where: {id: {_eq: $id}}) {
        id
        name
        Age
        books {
          id
          name
        }
      }
  }
  `
const GET_DETAILS_OF_BOOK = (id) => {
  return gql`
  query GET_BOOK_BY_ID {
    book_book(where: {id: {_eq: ${id}}}) {
      name
      author {
        id
        name
      }
    }
  }
  `
}


export {
  GET_ALL_AUTHORS,
  GET_DETAILS_OF_AUTHOR,
  GET_ALL_BOOKS,
  GET_DETAILS_OF_BOOK
}