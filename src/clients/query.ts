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
