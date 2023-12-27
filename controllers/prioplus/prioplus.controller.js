/**
 * Check if prio+ product is in order and add a tag to order
 * @author Rafael Granados <rafagranadosscs@gmail.com>
 * @module PrioPlus 
 */

require('dotenv').config()
const PrioPlusService = require('../../services/prioplus/prioplus.service')
const prioPlusServiceInstance = new PrioPlusService()

module.exports = class PrioPlus {
  /**
   * It is used for check if there are prio+ products and add a tog to order
   * @param {Object} req - HTTP request
   * @param {Object} res - HTTP response
   * @returns {Object} - Client response
   */
  async checkPrioPlus(req, res) {
    try {
      const { admin_graphql_api_id: orderId, line_items } = req.body;

      /* Check params received */
      if (!orderId || !line_items)
      return res.status(400).json();
      console.log(`New order -> ${orderId}`, line_items.map(item => item.title))
      
    
      /* Check for Prio+ Product */
      if (!line_items.some((item) => item.title == 'Prio+')) {
        console.log('Order without priority');
        return res.status(400).json();
      }

      /* Add tag to order */
      const addTags = await prioPlusServiceInstance.reqAddPrioPlusTagToOrder(`${orderId}`, 'prio+');
      if (!addTags) return res.status(403).json();
      
      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json();
    }
  }
}