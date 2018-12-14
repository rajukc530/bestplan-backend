import repository from '../repositories/plan.repository';

const uuid = require('uuid');

/**
 * Create new plan
 * @returns {Plan}
 */
function create(req, res, next) {
    const planName = req.body.name;
    const planId = uuid.v4();
    const planPrice = req.body.price;
    const planDescription = req.body.description;
    const planJson = {
        id: planId,
        name: planName,
        price: planPrice,
        description: planDescription,
    };
    repository
        .create(planJson)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findAllPlans(req, res, next) {
    repository
        .findAllPlans()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findPlanByName(req, res, next) {
    const { planName } = req.params;
    repository
        .findPlanByName(planName)
        .then(response => res.json(response))
        .catch(e => next(e));
}

export default {
    create,
    findAllPlans,
    findPlanByName,
};
