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


export {
    ADD_AUTHOR,
    ADD_BOOK
}