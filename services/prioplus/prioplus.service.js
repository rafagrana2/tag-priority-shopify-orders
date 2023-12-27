/**
 * Handle services for PrioPlus Controller
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 * @module PrioPlusService 
 */
require('dotenv').config()
const { GraphQLClient } = require('graphql-request')
const { beginOrderEdit, endOrderEdit, addTag } = require('../../graphql/prioplus/mutations/prioplus.mutation')
const ShopifyApiUtil = require('../../utils/shopifyAPI.util')

const ShopifyApiUtilInstance = new ShopifyApiUtil()
const { SHOPIFY_GRAPHQL_API_URL: endpoint } = process.env
const graphQlClient = new GraphQLClient(endpoint, { headers: ShopifyApiUtilInstance.getAPIHeaders() })

/**
 * class for handle prioplus services
 */
 module.exports = class PrioPlusService {
    async reqOrderEdit(id) {
        const variables = {
            id: id,
        }
        
        try{
            const data = await graphQlClient.request(beginOrderEdit, variables);
            console.log(data.orderEditBegin.calculatedOrder)
            const calculatedOrder = data.orderEditBegin.calculatedOrder.id;
            const calculatedLineItems = data.orderEditBegin.calculatedOrder.lineItems.edges;
            // const originalLineItems = data.orderEditBegin.originalOrder.lineItems.edges;

            let obj = {
                calculatedOrder: calculatedOrder,
                calculatedLineItems: calculatedLineItems,
                // originalLineItems: originalLineItems
            }
            return obj;  
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async reqAddPrioPlusTagToOrder(orderEditId, tags) {

        const variables = {
            id: orderEditId,
            tags: tags
        }
        try{
            const data = await graphQlClient.request(addTag, variables);
            if(!data) return false;
            console.log(data.tagsAdd)
            return true;  
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    async reqEndOrderEdit(orderEditId) {

        const variables = {
            orderEditId: orderEditId
        }

        try{
            const data = await graphQlClient.request(endOrderEdit, variables);
            if(!data) return false;
            
            return true;  
        } catch (err) {
            console.error(err);
            return err;
        }
    }
 }