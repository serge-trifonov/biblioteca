import {gql}from '@apollo/client'

export const GET_AUTHOR = gql`
  query getAuthor($_id:ID!){
    getAuthor(_id:$_id){
      _id,
      firstName,
      lastName,
      country
    }
  }
`

