import gql from 'graphql-tag';
// import { itemFragment } from '../item/queries';

import { coderDecoderFragment } from './queries';



export const initializeOpenTokenCodeGenMutation = gql`
  mutation InitializeOpenTokenCodeGen($initializeOpenTokenCodeGenInput: InitializeOpenTokenCodeGenInput!) {
    initializeOpenTokenCodeGen(initializeOpenTokenCodeGenInput: $initializeOpenTokenCodeGenInput) {
      _id
    }
  }`

  export const initializeOpenTokenCodeDecoderMutation = gql`
  mutation InitializeOpenTokenCodeDecoder($initializeOpenTokenCodeGenInput: InitializeOpenTokenCodeGenInput!) {
    initializeOpenTokenCodeDecoder(initializeOpenTokenCodeGenInput: $initializeOpenTokenCodeGenInput) {
      _id
    }
  }`


export const updateOpenTokenCodeGenStateMutation = gql`
${coderDecoderFragment}
  mutation UpdateOpenTokenCodeGenState($updateTokenDataInput: UpdateTokenDataInput!) {
    updateTokenData(updateTokenDataInput: $updateTokenDataInput){
      ...CodeDecoder
    }
  }
  `
  export const updateOpenTokenCodeDecoderStateMutation = gql`
${coderDecoderFragment}
  mutation UpdateOpenTokenCodeDecoderState($updateOpenTokenDecoderInput: UpdateOpenTokenDecoderInput!) {
    updateOpenTokenDecoder(updateOpenTokenDecoderInput: $updateOpenTokenDecoderInput){
      ...CodeDecoder
    }
  } 
  `

  export const deductDeviceCalenderDaysMutation = gql `
  ${coderDecoderFragment}
  mutation DeductDeviceCalenderDays($deductDeviceCalenderDaysInput: DeductDeviceCalenderDaysInput!) {
  deductDeviceCalenderDays(deductDeviceCalenderDaysInput: $deductDeviceCalenderDaysInput) {
      ...CodeDecoder
  }
}
  `



  /**
 * createSingleItem(
createItemInput: CreateItemInput!
): Item!
 */
export const createSingleItemMutation = gql`
mutation CreateSingleItem($createItemInput: CreateItemInput!) {
  createSingleItem(createItemInput: $createItemInput) {
     _id
  }
}
`;  
// export const itemFragment = gql`
// fragment Item on Item {
//   _id
//   deleteStatus
//   deleteAt
//   createdAt
//   updatedAt
//   type
//   actionScope
//   actorName
//   profile
//   idType
//   idString
//   description
//   creationDate
//   oemID
//   oemItemID
//   sellerID
//   sellerItemID
// `;