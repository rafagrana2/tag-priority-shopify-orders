/**
 * GraphQL queries
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 */
const { gql } = require('graphql-request');

const getProductVariant = gql`
query productVariant($id: ID!) {
    productVariant(id:$id){
       id
       sku
       inventoryQuantity
       inventoryItem {
         id
       }
    }
}
  
`;

const getProduct = gql`
query product($id: ID!) {
  product(id:$id) {
    id
    tags
    variants(first: 15) {
      edges {
        node {
          id
        }
      }
    }
  }
}
  
`;

module.exports = { getProductVariant, getProduct };