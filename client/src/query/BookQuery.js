import {gql}from '@apollo/client'

export const GET_ALL_BOOKS= gql`
query{
    getBooks{
      title,
      authorName,
      genre,
      description
      
    }
  }
`