import Sequelize from 'sequelize';
import db, { Plan } from '../../config/sequelize';


const Op = Sequelize.Op;
/**
 *
 * @param {*} plan
 */
async function create(plan) {
    return Plan.create(plan);
}

async function findAllPlans() {
    const plans = await Plan.findAll();
    return plans;
}

async function findPlanByName(planName) {
    const plans = await Plan.findOne({
        where: {
            name: planName,
        },
    });
    return plans;
}

export default {
    create,
    findAllPlans,
    findPlanByName,
};

