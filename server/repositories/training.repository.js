import Sequelize from 'sequelize';
import db, { Training } from '../../config/sequelize';


const Op = Sequelize.Op;
/**
 *
 * @param {*} Training
 */
async function create(training) {
    return Training.create(training);
}

async function findAllTrainingsForUser(user) {
    const trainings = await Training.findAll({
        where: {
            userId: user,
        },
        order: [['createdAt', 'DESC']],
    });
    return trainings;
}

async function findUsersByTraining(nameStr) {
    const training = await Training.scope('userScope').findAll({
        where: {
            name: nameStr,
        },
    });
    return training;
}

export default {
    create,
    findAllTrainingsForUser,
    findUsersByTraining,
};

