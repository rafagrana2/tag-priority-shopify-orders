/**
 * GraphQL muations for discounts
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 */
const { gql } = require("graphql-request");

const beginOrderEdit = gql`
mutation orderEditBegin($id: ID!) {
    orderEditBegin(id: $id) {
      userErrors {
        field
        message
      }
      calculatedOrder {
           id
        lineItems(first: 20){
          edges{
            node{
              id
              quantity
              customAttributes {
                  key
                  value
              }
            }
          }
        }
        originalOrder{
          lineItems(first:20){
            edges{
              node{
                id
                customAttributes {
                    key
                    value
                }
              }
            }
          }
        }
        
      }
    }
  }
`;

const addVariantToOrder = gql`
    mutation addVariantToOrder($orderEditId: ID!, $variantId: ID!, $quantity: Int!) {
        orderEditAddVariant(id: $orderEditId, variantId: $variantId, quantity: $quantity) {
            calculatedOrder {
                id
                addedLineItems(first: 5) {
                    edges {
                        node {
                            id
                            title
                            quantity
                        }
                    }
                }
            }
        }
    }
`;

const addDiscountToVariant = gql`
    mutation addDiscount($orderEditId: ID!, $lineItemId: ID!, $discount: OrderEditAppliedDiscountInput!) {
        orderEditAddLineItemDiscount(
            id: $orderEditId
            lineItemId: $lineItemId
            discount: $discount
        ) {
            calculatedOrder {
                id
                addedLineItems(first: 5) {
                    edges {
                        node {
                            id
                            title
                            quantity
                        }
                    }
                }
            }
            userErrors {
                field
                message
            }
        }
    }
`;

const createAutomaticDiscount = gql `
    mutation discountAutomaticBasicCreate($automaticBasicDiscount: DiscountAutomaticBasicInput!) {  
        discountAutomaticBasicCreate(automaticBasicDiscount: $automaticBasicDiscount) {    
            automaticDiscountNode {      
                id    
            }    
            userErrors {      
                code      
                extraInfo      
                field      
                message    
            }  
        }
    }
`;

const endOrderEdit = gql`
    mutation commitEdit($orderEditId: ID!) {
        orderEditCommit(
            id: $orderEditId
            notifyCustomer: false
            staffNote: "Edited by backend inventory app"
        ) {
            order {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

const addTag = gql`
  mutation addTags($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      node {
        id
      }
      userErrors {
        message
      }
    }
  }
`;

module.exports = { beginOrderEdit, addTag, endOrderEdit, createAutomaticDiscount, addDiscountToVariant, addVariantToOrder };