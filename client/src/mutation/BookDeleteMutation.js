import {gql}from '@apollo/client'

export const DELETE_BOOK= gql`
mutation deleteBook($_id:ID!){
    deleteBook(id:$id){
      ok
    }
  }
`


  