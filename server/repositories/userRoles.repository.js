import Sequelize from 'sequelize';
import db, { UserRoles } from '../../config/sequelize';


const Op = Sequelize.Op;
/**
 *
 * @param {*} user
 */
async function create(userRole) {
    await UserRoles.create(userRole);
}

async function findUserByUserId(uId) {
    const user = UserRoles.findOne({
        where: {
            userId: uId,
        },
    });
    return user;
}

export default {
    create,
    findUserByUserId,
};

