import { gql, useMutation } from '@apollo/client';

const ADD_AUTHOR = gql`
  mutation ADD_AUTHOR($object: author_author_insert_input = {}) {
    insert_author_author_one(object: $object) {
      id
    }
  }
`;
const ADD_BOOK = gql`
  mutation ADD_BOOK($object: book_book_insert_input = {}) {
    insert_book_book_one(object: $object) {
      id
    }
  }
`;

const UPDATE_BOOK = gql`
mutation UpdateBook($id: String!, $name: String) {
  update_book_book_by_pk(
    pk_columns: { id: $id },
    _set: { name: $name}
  ) {
    name
  }
}`
const DELETE_BOOK = gql`
mutation DELETE_BOOK($id: String = null) {
  delete_book_book(where: {id: {_eq: $id}}){
    affected_rows
  }
}
`



export {
  ADD_AUTHOR,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
}