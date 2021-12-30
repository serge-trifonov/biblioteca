import {gql}from '@apollo/client'

export const ADD_AUTHOR= gql`
mutation addBook($author:AuthorInput!){
    addAuthor(author:$author){
      ok
    }
  }
`


  