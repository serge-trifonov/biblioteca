import {gql}from '@apollo/client'

export const FIND_BOOKS= gql`
query findBooksByParams($bookParams:BookInputByParams!){
    findBooksByParams(bookParams:$bookParams){
        _id, 
        title,
        description,
        authorId,
        genre
      }
  }
`

