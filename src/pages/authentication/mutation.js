import { gql } from "@apollo/client";


/**
 * type AuthToken {
_id: ID!
accessToken: String
actionScope: ActionScope
agentId: String
agentType: AgentTypes
authenticationInstance: AuthenticationInstance
birthDate: DateTime
createdAt: DateTime
deleteAt: DateTime
deleteStatus: Boolean
email: String
firstName: String
hireDate: DateTime
idString: String
idType: PersonalIDTypes
lastName: String
name: String
officeAddress: AuthAddress
profile: String
role: Roles
roleName: String
subrole: SubRoles
type: String
updatedAt: DateTime
}
 */
export const authTokenFragment = gql`
  fragment AuthToken on AuthToken {
    _id
    accessToken
    actionScope
    agentId
    agentType
    authenticationInstance {
      _id
      name
    }
    birthDate
    createdAt
    deleteAt
    deleteStatus
    email
    firstName
    hireDate
    idString
    idType
    lastName
    name
    officeAddress {
      _id
      city
      country
      createdAt
      deleteAt
      deleteStatus
      postcode
      srpc
      street
      unit
      updatedAt
    }
    profile
    role {
      _id
      name
    }
    roleName
    subrole {
      _id
      name
    }
    type
    updatedAt
  }
`;



export const signInLoginUserMutation = gql`
  ${authTokenFragment}
  mutation SignInLoginUser($signInCredentials: SignInCredentialsDto!) {
    signInUser(signInCredentials: $signInCredentials) {
      ...AuthToken
    }
  }
`;