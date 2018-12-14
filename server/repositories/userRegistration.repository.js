import Sequelize from 'sequelize';
import db, { User, UserRoles, Plan, UserWeight, Diet, Training } from '../../config/sequelize';

const Op = Sequelize.Op;
/**
 *
 * @param {*} user
 */
async function create(user) {
    return User.create(user);
}

async function findById(userId) {
    const user = await User.findOne({
        where: {
            id: userId,
        },
    });
    return user;
}

async function updateUser(userId, password) {
    const user = await User.findOne({
        where: {
            id: userId,
        },
    });
    if (user) {
        user.password = password;
        return user.save();
    }
    return null;
}

async function findAllUsers() {
    const users = await User.scope('userScope').findAll({
        order: [['createdAt', 'DESC']],
    });
    return users;
}

async function findAllUsersInTraining() {
    const users = await User.scope('nameScope').findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: Training.scope('trainingScope'),
                as: 'UserTraining',
            },
        ],
    });
    return users;
}

async function findAllUsersInDiet() {
    const users = await User.scope('nameScope').findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: Diet.scope('dietScope'),
                as: 'UserDiet',
            },
        ],
    });
    return users;
}

async function findUserPlan(userId) {
    const user = await User.scope('nameScope').findOne({
        where: {
            id: userId,
        },
        include: [
            {
                model: Plan.scope('userPlanScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function findUserByUsername(userName) {
    const user = await User.findOne({
        where: {
            email: userName,
        },
        include: [
            {
                model: UserRoles.scope('nameScope'),
                as: 'UserRoles',
            },
            {
                model: Plan.scope('userPlanScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function getPlanDetails(userId) {
    const user = await User.scope('planScope').findOne({
        where: {
            id: userId,
        },
        include: [
            {
                model: Plan.scope('userPlanScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function checkIfClientIsAdmin(username) {
    const user = await User.findOne({
        where: {
            email: username,
        },
    });

    const userRole = await User.findOne({
        where: {
            userId: user.id,
        },
    });

    if (userRole && userRole.roleId === 1) {
        return true;
    }
    return false;
}

async function findUserProfile(userName) {
    const user = await User.scope('profileScope').findOne({
        where: {
            id: userName,
        },
    });
    return user;
}

async function fetchNewUsers() {
    const users = await User.scope('nameScope').findAll({
        order: [['createdAt', 'DESC']],
        offset: 0,
        limit: 8,
    });
    return users;
}

async function getTotalUserCount() {
    const userCount = await User.scope('nameScope').count();
    return userCount;
}

async function getUserCountOfLast30Days() {
    const users = await User.scope('nameScope').count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 30),
            },
        },
    });
    return users;
}

async function getUserCountOfLast7Days() {
    const users = await User.scope('nameScope').count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 7),
            },
        },
    });
    return users;
}

async function getUserCountOfLastDay() {
    const users = await User.scope('nameScope').count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
        },
    });
    return users;
}

async function getUserRegistrationData() {
    return new Promise((resolve, reject) => {
        const sqlQuery = ''
                + 'SELECT m.month, '
                + 'Ifnull(t.total, 0) AS count '
                + 'FROM (SELECT Date_format (Date_sub(Curdate(), INTERVAL 0 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 1 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 2 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 3 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 4 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 5 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 6 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 7 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 8 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 9 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 10 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 11 month), \'%b\') AS '
                + 'month) AS '
                + 'm '
                + 'LEFT JOIN (SELECT Date_format(createdAt, \'%b\') AS month, '
                + 'Count(1) AS total '
                + 'FROM User '
                + 'WHERE createdAt <= Now() '
                + 'AND createdAt >= Date_add(Now(), INTERVAL - 12 month) '
                + 'GROUP BY Date_format(createdAt, \'%b\')) AS t '
                + 'ON m.month = t.month';
        db.sequelize
            .query(sqlQuery, { model: User })
            .then((response) => {
                resolve(response);
            })
            .catch(error => reject(error));
    });
}

async function getUserGoalWeightChart(user) {
    return new Promise((resolve, reject) => {
        const sqlQuery = ''
                + 'SELECT m.month, '
                + 'Ifnull(t.total, 0) AS weight '
                + 'FROM (SELECT Date_format (Date_sub(Curdate(), INTERVAL 0 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 1 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 2 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 3 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 4 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 5 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 6 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 7 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 8 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 9 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 10 month), \'%b\') AS '
                + 'month '
                + 'UNION '
                + 'SELECT Date_format (Date_sub(Curdate(), INTERVAL 11 month), \'%b\') AS '
                + 'month) AS '
                + 'm '
                + 'LEFT JOIN (SELECT Date_format(createdAt, \'%b\') AS month, '
                + 'avg(weight) AS total '
                + 'FROM UserWeight '
                + 'WHERE createdAt <= Now() '
                + `AND userId = '${user}' `
                + 'AND createdAt >= Date_add(Now(), INTERVAL - 12 month) '
                + 'GROUP BY Date_format(createdAt, \'%b\')) AS t '
                + 'ON m.month = t.month';
        db.sequelize
            .query(sqlQuery, { model: UserWeight })
            .then((response) => {
                resolve(response);
            })
            .catch(error => reject(error));
    });
}

async function updateUserPlan(userId) {
    const plan = await Plan.findOne({
        where: {
            description: 'Training & Diet',
        },
    });
    if (plan) {
        const planId = plan.id;
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });
        if (user) {
            user.planId = planId;
            return user.save();
        }
    }
    return null;
}

export default {
    create,
    findById,
    findAllUsers,
    findAllUsersInTraining,
    findAllUsersInDiet,
    fetchNewUsers,
    getTotalUserCount,
    getUserCountOfLast30Days,
    getUserCountOfLast7Days,
    getUserCountOfLastDay,
    getUserRegistrationData,
    findUserByUsername,
    findUserProfile,
    checkIfClientIsAdmin,
    getPlanDetails,
    updateUserPlan,
    findUserPlan,
    getUserGoalWeightChart,
    updateUser,
};
