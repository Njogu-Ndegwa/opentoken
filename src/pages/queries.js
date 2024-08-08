import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
export const openTokeCodeHistoryFragment = gql`
fragment OpenTokenCodeHistory on OpenTokenCodeEvent {
        _id
        token
        token_type
        token_value
        max_count
	    code_history_type
        createdAt
        updatedAt
}
`

export const coderDecoderFragment = gql`
  fragment CodeDecoder on Item {
     _id
    openTokencodeGen {
        _id
        deleteStatus
        deleteAt
        createdAt
        updatedAt
        secret_key
        token
        token_type
        token_value
        max_count
        starting_code
    }
    openTokenCodeDecoder {
        _id
        deleteStatus
        deleteAt
        createdAt
        updatedAt
        secret_key
        token
        token_type
        token_value
        max_count
        used_count
        starting_code
        remaining_credit_days
        payg_enabled
        output_enabled
    }
}
`;
export const expandedCoderDecoderFragment = gql`
${openTokeCodeHistoryFragment}
  fragment CodeDecoder on Item {
     _id
    openTokencodeGen {
        _id
        deleteStatus
        deleteAt
        createdAt
        updatedAt
        secret_key
        token
        token_type
        token_value
        max_count
        starting_code
        openTokenCodeHistory {
        ...OpenTokenCodeHistory
        }
    }
    openTokenCodeDecoder {
        _id
        deleteStatus
        deleteAt
        createdAt
        updatedAt
        secret_key
        token
        token_type
        token_value
        max_count
        used_count
        starting_code
        remaining_credit_days
        payg_enabled
        output_enabled
        openTokenCodeHistory {
        ...OpenTokenCodeHistory
        }
    }
}
`;


export const getItembyOemItemIdQuery = gql`
  ${expandedCoderDecoderFragment}
  query GetItembyOemItemId($oemItemId: ID!) {
    getItembyOemItemId(oemItemId: $oemItemId) {
      ...CodeDecoder
    }
  }
`;

/**
 * type Item {
_id: ID!
deleteStatus: Boolean
deleteAt: DateTime
createdAt: DateTime
updatedAt: DateTime
type: ActorTypes!
actionScope: ActionScope!
actorName: String!
profile: String!
idType: String!
idString: String!
description: String!
creationDate: DateTime!
itemOEM_ID: String!
itemPAYG_ID: String!
itemSKU: ItemSKU!
itemBatch: ItemBatch!
itemFirmware: ItemFirmware!
lifeCycle: String
codeGenerator: CodeGenerator

 */
export const itemFragment = gql`
  fragment Item on Item {
    _id
    deleteStatus
    deleteAt
    createdAt
    updatedAt
    type
    actionScope
    actorName
    profile
    idType
    idString
    description
    creationDate
    oemID
    oemItemID
    sellerID
    sellerItemID
  }
`;

/**
 * type ItemEdge {
cursor: String
node: Item
}
 */
const itemEdgeFragment = gql`
  ${itemFragment}
  fragment ItemEdge on ItemEdge {
    cursor
    node {
      ...Item
    }
  }
`;
/**
 * type ItemPageInfo {
startCursor: String
endCursor: String
hasPreviousPage: Boolean!
hasNextPage: Boolean!
}
 */
const itemPageInfoFragment = gql`
  fragment ItemPageInfo on ItemPageInfo {
    startCursor
    endCursor
    hasPreviousPage
    hasNextPage
  }
`;
/**
 * type ItemConnection {
edges: [ItemEdge!]
pageInfo: ItemPageInfo
}
 */
const itemConnectionFragment = gql`
  ${itemEdgeFragment}
  ${itemPageInfoFragment}
  fragment ItemConnection on ItemConnection {
    edges {
      ...ItemEdge
    }
    pageInfo {
      ...ItemPageInfo
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
export const pageDataFragment = gql`
  fragment PageData on PageData {
    count
    limit
    offset
  }
`;

/**
 * type GetAllItemsResponse {
page: ItemConnection!
pageData: PageData
}
 */
export const getAllItemsResponseFragment = gql`
  ${itemConnectionFragment}
  ${pageDataFragment}
  fragment GetAllItemsResponse on GetAllItemsResponse {
    page {
      ...ItemConnection
    }
    pageData {
      ...PageData
    }
  }
`;
/**
 * getAllItems(
before: String
after: String
first: Int
last: Int
): GetAllItemsResponse!
 */
const getAllItemsQuery = gql`
  ${getAllItemsResponseFragment}
  query GetAllItems(
    $queryorder: QueryOrder!
    $before: String
    $after: String
    $first: Int
    $last: Int
    $search: String
  ) {
    getAllItems(
      queryorder: $queryorder
      before: $before
      after: $after
      first: $first
      last: $last
      search: $search
    ) {
      ...GetAllItemsResponse
    }
  }
`;

/**
 * getAllClientItemsInItemFleet(
after: String
before: String
first: Int
getAllClientItemsInItemFleet: GetAllClientItemsInItemFleet!
last: Int
): GetAllItemsResponse!
 */
const getAllClientItemsInItemFleetQuery = gql`
  ${getAllItemsResponseFragment}
  query IGetAllClientItemsInItemFleet(
    $after: String
    $before: String
    $first: Int
    $igetAllClientItemsInItemFleet: GetAllClientItemsInItemFleet!
    $last: Int
  ) {
    getAllClientItemsInItemFleet(
      after: $after
      before: $before
      first: $first
      getAllClientItemsInItemFleet: $igetAllClientItemsInItemFleet
      last: $last
    ) {
      ...GetAllItemsResponse
    }
  }
`;

/**
 * Query.getAllClientItems(
after: String
before: String
clientId: ID!
first: Int
last: Int
): GetAllItemsResponse!
 */
const getAllClientItemsQuery = gql`
  ${getAllItemsResponseFragment}
  query GetAllClientItems(
    $after: String
    $before: String
    $clientId: ID!
    $first: Int
    $last: Int
    $assetaccount: Boolean!
    $search: String
    $searchByOemItemId: String
    $queryorder: QueryOrder!
    $isOpenTokenSimulator: Boolean
  ) {
    getAllClientItems(
      after: $after
      before: $before
      clientId: $clientId
      first: $first
      last: $last
      assetaccount: $assetaccount
      search: $search
      searchByOemItemId: $searchByOemItemId
      queryorder: $queryorder
      pagination: CURSOR
      isOpenTokenSimulator: $isOpenTokenSimulator
    ) {
      ...GetAllItemsResponse
    }
  }
`;

export const useLazyGetItembyOemItemIdQuery = (variables) =>
    useLazyQuery(
        getItembyOemItemIdQuery,
        {
            variables
        }
    );


    export const useLazyGetAllClientItemsQuery = (
        variables
      ) => {
        return useLazyQuery(
          getAllClientItemsQuery,
          {
            variables
          }
        );
      };



