const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a payment intent
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (e.g., 'usd')
 * @returns {Promise} - Stripe payment intent
 */
const createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

/**
 * Retrieve a payment intent
 * @param {string} id - Payment intent ID
 * @returns {Promise} - Stripe payment intent
 */
const retrievePaymentIntent = async (id) => {
    try {
        return await stripe.paymentIntents.retrieve(id);
    } catch (error) {
        console.error('Error retrieving payment intent:', error);
        throw error;
    }
};

/**
 * Create a customer
 * @param {Object} customerData - Customer data
 * @returns {Promise} - Stripe customer
 */
const createCustomer = async (customerData) => {
    try {
        return await stripe.customers.create(customerData);
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

module.exports = {
    stripe,
    createPaymentIntent,
    retrievePaymentIntent,
    createCustomer
};