import Sequelize from 'sequelize';
import db, { User, Plan } from '../../config/sequelize';


const Op = Sequelize.Op;

async function getTotalRevenue() {
    const user = User.scope('planScope').findAll({
        include: [
            {
                model: Plan.scope('planScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function getRevenueOfLast30Days() {
    const user = User.scope('revenueScope').findAll({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 30),
            },
        },
        include: [
            {
                model: Plan.scope('planScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function getRevenueOfLast7Days() {
    const user = User.scope('revenueScope').findAll({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 7),
            },
        },
        include: [
            {
                model: Plan.scope('planScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function getRevenueOfLastDay() {
    const user = User.scope('revenueScope').findAll({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
        },
        include: [
            {
                model: Plan.scope('planScope'),
                as: 'UserPlan',
            },
        ],
    });
    return user;
}

async function getReveueData() {
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
                + 'LEFT JOIN (SELECT Date_format(a.createdAt, \'%b\') AS month, '
                + 'SUM(b.price) AS total '
                + 'FROM User a , Plan b '
                + 'WHERE a.planId = b.id AND a.createdAt <= Now() '
                + 'AND a.createdAt >= Date_add(Now(), INTERVAL - 12 month) '
                + 'GROUP BY Date_format(a.createdAt, \'%b\')) AS t '
                + 'ON m.month = t.month';
        db.sequelize
            .query(sqlQuery, { model: User, Plan })
            .then((response) => {
                resolve(response);
            })
            .catch(error => reject(error));
    });
}

export default {
    getTotalRevenue,
    getRevenueOfLast30Days,
    getRevenueOfLastDay,
    getRevenueOfLast7Days,
    getReveueData,
};

