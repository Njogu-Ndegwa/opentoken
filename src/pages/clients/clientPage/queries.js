import { useLazyQuery, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export const payPlanFragment = gql`
  fragment PayPlan on PayPlan {
    _id
    createdAt
    deleteAt
    deleteStatus
    parameters {
      description
      parameter
      value
    }
    type
    updatedAt
  }
`;

/***
 * type Activity {
action: String!
datetime: DateTime!
postState: String!
preState: String!
}
 */
const activityFragment = gql`
  fragment Activity on Activity {
    action
    amount
    datetime
    notes
  }
`;

/**
 * interface Payment {
amount: Float!
datetime: DateTime!
instruction: String!
}
 */
const paymentFragment = gql`
  fragment Payment on Payment {
    amount
    datetime
    instruction
  }
`;


/**
 * type AssetAccount {
_id: ID!
asset: Item!
c2uRatio: Float!
createdAt: DateTime
credit: CreditAccount!
deleteAt: DateTime
deleteStatus: Boolean
payHistory: [Payment!]
paySchedule: [Payment!]
updatedAt: DateTime
user: Person!
}
 */
export const assetAccountFragment = gql`
  ${paymentFragment}
  ${activityFragment}
  ${payPlanFragment}
  fragment AssetAccount on AssetAccount {
    _id
    accountStage
    payPlan {
      ...PayPlan
    }
    asset {
      _id
      oemItemID
      codeGenerator {
        _id
      }
    }
    createdAt
    deleteAt
    deleteStatus
    manager {
      _id
      orgContactPerson {
        _id
        name
      }
    }
    paySchedule {
      ...Payment
    }
    credit {
      accountStatus
      activities {
        ...Activity
      }
      balance
      currency
      owner {
        _id
        name
      }
    }
    updatedAt
    user {
      _id
    }
  }
`;


/**
 * type AssetAccountEdge {
cursor: String
node: AssetAccount
}
 */
const assetAccountEdgeFragment = gql`
  ${assetAccountFragment}
  fragment AssetAccountEdge on AssetAccountEdge {
    cursor
    node {
      ...AssetAccount
    }
  }
`;

/**
 * type AssetAccountPageInfo {
endCursor: String
hasNextPage: Boolean!
hasPreviousPage: Boolean!
startCursor: String
}
 */
const assetAccountPageInfoFragment = gql`
  fragment AssetAccountPageInfo on AssetAccountPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

/**
 * type AssetAccountConnection {
edges: [AssetAccountEdge!]
pageInfo: AssetAccountPageInfo
}
 */
const assetAccountConnectionFragment = gql`
  ${assetAccountPageInfoFragment}
  ${assetAccountEdgeFragment}
  fragment AssetAccountConnection on AssetAccountConnection {
    edges {
      ...AssetAccountEdge
    }
    pageInfo {
      ...AssetAccountPageInfo
    }
  }
`;

/**
 * type PageData {
count: Float!
limit: Float!
offset: Float!
}
 */
const pageDataFragment = gql`
  fragment PageData on PageData {
    count
    limit
    offset
  }
`;

/**]
 * type GetAllAssetAccountsResponse {
page: AssetAccountConnection!
pageData: PageData
}
 */
const getAllAssetAccountsResponseFragment = gql`
  ${assetAccountConnectionFragment}
  ${pageDataFragment}
  fragment GetAllAssetAccountsResponse on GetAllAssetAccountsResponse {
    page {
      ...AssetAccountConnection
    }
    pageData {
      ...PageData
    }
  }
`;


/**
 * getAllAssetAccountsForClient(
clientId: ID!
before: String
after: String
first: Int
last: Int
): GetAllAssetAccountsResponse!
 */
export const getAllAssetAccountsForClientQuery = gql`
  ${getAllAssetAccountsResponseFragment}
  query GetAllAssetAccountsForClient(
    $clientId: ID!
    $before: String
    $after: String
    $first: Int
    $last: Int
    $search: String
  ) {
    getAllAssetAccountsForClient(
      clientId: $clientId
      before: $before
      after: $after
      first: $first
      last: $last
      search: $search
    ) {
      ...GetAllAssetAccountsResponse
    }
  }
`;