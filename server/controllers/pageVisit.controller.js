import repository from '../repositories/pageVisit.repository';

const uuid = require('uuid');
const publicIp = require('public-ip');

async function createPageVisit(req, res, next) {
    const currentPage = req.body.page;
    let IP;
    await publicIp.v4().then((ip) => {
        IP = ip;
    });
    const pageVisit = {
        id: uuid.v4(),
        ipAddress: IP,
        page: currentPage,
        userId: uuid.v4(),
    };
    repository
        .create(pageVisit)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getTotalPageVisitCount(req, res, next) {
    repository
        .getTotalPageVisitsCount()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getPageVisitCountOfLast30Days(req, res, next) {
    repository
        .getPageVisitCountOfLast30Days()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getPageVisitCountOfLast7Days(req, res, next) {
    repository
        .getPageVisitCountOfLast7Days()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getPageVisitCountOfLastDay(req, res, next) {
    repository
        .getPageVisitCountOfLastDay()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function serializeJson(message) {
    // console.log('message ', JSON.stringify(message));
    const resMsg = JSON.parse(JSON.stringify(message));
    const months = [];
    const count = [];
    let res = {};
    for (const msg of resMsg) {
        // console.log('msg ', msg.month);
        months.push(msg.month);
        count.push(msg.count);
    }

    res = {
        month: months,
        data: count,
    };
    return res;
}

function getPageVisitsData(req, res, next) {
    repository
        .getPageVisitData()
        .then(async message => {
            const response = await serializeJson(message);
            res.json(response);
        })
        .catch(e => next(e));
}

export default {
    createPageVisit,
    getTotalPageVisitCount,
    getPageVisitsData,
    getPageVisitCountOfLastDay,
    getPageVisitCountOfLast7Days,
    getPageVisitCountOfLast30Days,
};
