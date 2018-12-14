import Sequelize from 'sequelize';
import db, { PageVisits } from '../../config/sequelize';


const Op = Sequelize.Op;
/**
 *
 * @param {*} pageVisit
 */
async function create(pageVisit) {
    return PageVisits.create(pageVisit);
}

async function getTotalPageVisitsCount() {
    const pageVist = await PageVisits.count();
    return pageVist;
}

async function getPageVisitCountOfLast30Days() {
    const last30DaysCount = await PageVisits.count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 30),
            },
        },
    });
    return last30DaysCount;
}

async function getPageVisitCountOfLast7Days() {
    const last7DaysCount = await PageVisits.count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000 * 7),
            },
        },
    });
    return last7DaysCount;
}

async function getPageVisitCountOfLastDay() {
    const lastDayCount = await PageVisits.count({
        where: {
            createdAt: {
                [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
        },
    });
    return lastDayCount;
}

async function getPageVisitData() {
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
                + 'FROM PageVisits '
                + 'WHERE createdAt <= Now() '
                + 'AND createdAt >= Date_add(Now(), INTERVAL - 12 month) '
                + 'GROUP BY Date_format(createdAt, \'%b\')) AS t '
                + 'ON m.month = t.month';
        db.sequelize
            .query(sqlQuery, { model: PageVisits })
            .then((response) => {
                resolve(response);
            })
            .catch(error => reject(error));
    });
}

export default {
    create,
    getTotalPageVisitsCount,
    getPageVisitCountOfLast30Days,
    getPageVisitCountOfLastDay,
    getPageVisitCountOfLast7Days,
    getPageVisitData,
};

