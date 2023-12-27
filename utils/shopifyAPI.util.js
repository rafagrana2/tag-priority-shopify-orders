/**
 * Utilities for Shopify API
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 * @module ShopifyApiUtil 
 */
require('dotenv').config();

const { SHOPIFY_API_PWD: shopifyToken}  = process.env;
/** Class for interact with shopify API */
module.exports = class ShopifyApiUtil{

  getAPIHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyToken,
    };
  
    return headers;
  };
}