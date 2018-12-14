import config from '../../config/config';

const stripe = require('stripe')(config.stripeTestKey);

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function placeStripeOrder(req, res, next) {
    const stripeJson = req.body;
    const price = stripeJson.amount * 100;
    stripe.customers.create({
        email: stripeJson.name,
        source: stripeJson.token,
    })
        .then(customer =>
            stripe.charges.create({
                amount: price,
                description: 'Bestplan',
                currency: 'dkk',
                customer: customer.id,
            }))
        .then(charge => res.json(charge))
        .catch(e => next(e));
}

export default {
    placeStripeOrder,
};
