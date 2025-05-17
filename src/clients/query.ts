import { gql } from "@apollo/client";
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
      id
      username
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        id
        username
        firstName
        lastName
        email
        createdAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      username
      firstName
      lastName
      email
      createdAt
    }
  }
`;
