import Sequelize from 'sequelize';
import db, { Diet } from '../../config/sequelize';


const Op = Sequelize.Op;
/**
 *
 * @param {*} Diet
 */
async function create(diet) {
    return Diet.create(diet);
}

async function findDietByName(dietName) {
    const diet = await Diet.findOne({
        where: {
            name: dietName,
        },
    });
    return diet;
}

async function findAllDiets() {
    const diets = await Diet.findAll();
    return diets;
}

async function findAllDietsForUser(user) {
    const diets = await Diet.findAll({
        where: {
            userId: user,
        },
        order: [['createdAt', 'DESC']],
    });
    return diets;
}

async function findDietForUser(user) {
    const diet = await Diet.findOne({
        where: {
            userId: user,
        },
        order: [['createdAt', 'DESC']],
    });
    return diet;
}

async function findUsersByDiet(cal) {
    const diet = await Diet.scope('userScope').findAll({
        where: {
            calorie: cal,
        },
    });
    return diet;
}

export default {
    create,
    findAllDiets,
    findDietByName,
    findAllDietsForUser,
    findDietForUser,
    findUsersByDiet,
};

