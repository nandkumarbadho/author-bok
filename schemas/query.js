import { useQuery, gql } from '@apollo/client';

const GET_ALL_AUTHORS = gql`
    query GET_ALL_AUTHORS {
        author_author (order_by: {created_at: desc}){
          id
          name
          Age
        }
      }
`;
const GET_ALL_BOOKS = gql`
    query GET_ALL_BOOKS ($limit: Int = 5, $offset: Int = 0) {
      book_book(limit: $limit, offset: $offset){
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
const GET_DETAILS_OF_BOOK = gql`    
  query GET_BOOK_BY_ID($id: String!){
    book_book(where: {id: {_eq: $id}}) {
      name
      author {
        id
        name
      }
      }
  }
  `
// const GET_DETAILS_OF_BOOK = (id) => {
//   return gql`
//   query GET_BOOK_BY_ID {
//     book_book(where: {id: {_eq: ${id}}}) {
//       name
//       author {
//         id
//         name
//       }
//     }
//   }
//   `
// }


export {
  GET_ALL_AUTHORS,
  GET_DETAILS_OF_AUTHOR,
  GET_ALL_BOOKS,
  GET_DETAILS_OF_BOOK
}