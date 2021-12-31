import {gql}from '@apollo/client'

export const REMOVE_BOOK= gql`
mutation deleteBook($id:ID!){
    deleteBook(id:$id){
      ok
    }
  }
`


  