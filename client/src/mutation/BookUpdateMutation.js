import {gql}from '@apollo/client'

export const UPDATE_BOOK= gql`
mutation updateBook($id:ID!,$book:BookInput!){
    updateBook(id:$id,book:$book){
      ok
    }
  }
`


  