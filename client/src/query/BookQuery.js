import {gql}from '@apollo/client'

export const GET_ALL_BOOKS= gql`
query{
    getBooks{
      _id,
      title,
      authorId,
      genre,
      description,
      year
    }
  }
`