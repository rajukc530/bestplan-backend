import Sequelize from 'sequelize';
import db, { UserWeight } from '../../config/sequelize';

const Op = Sequelize.Op;
/**
 *
 * @param {*} user
 */
async function create(weight) {
    return UserWeight.create(weight);
}

async function getUserWeight(uId) {
    const userWeight = UserWeight.findAll({
        where: {
            userId: uId,
        },
        order: [['createdAt', 'DESC']],
    });
    return userWeight;
}

async function getUserRecentWeight(uId) {
    const userWeight = UserWeight.findOne({
        where: {
            userId: uId,
        },
        order: [['createdAt', 'DESC']],
    });
    return userWeight;
}

export default {
    create,
    getUserWeight,
    getUserRecentWeight,
};
