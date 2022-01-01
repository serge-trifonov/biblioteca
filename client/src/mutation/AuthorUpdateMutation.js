import {gql}from '@apollo/client'

export const UPDATE_AUTHOR= gql`
mutation updateAuthor($id:ID!,$author:AuthorInput!){
    updateAuthor(id:$id,author:$author){
      ok
    }
  }
`


  