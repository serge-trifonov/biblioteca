import {gql}from '@apollo/client'

export const REMOVE_AUTHOR= gql`
mutation deleteAuthor($id:ID!){
  deleteAuthor(id:$id){
      ok
    }
  }
`


  