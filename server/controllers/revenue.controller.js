import repository from '../repositories/revenue.repository';

function getSumOfPrice(response) {
    let totalPrice = 0;
    for (const user of response) {
        let price = Number(user.UserPlan.price);
        totalPrice = totalPrice + price;
    }
    // const revenue = {
    //     revenue: totalPrice,
    // };
    return totalPrice;
}

function getTotalRevenue(req, res, next) {
    repository
        .getTotalRevenue()
        .then(async (message) => {
            const response = await getSumOfPrice(message);
            res.json(response);
        })
        .catch(e => next(e));
}

function getRevenueOfLast30Days(req, res, next) {
    repository
        .getRevenueOfLast30Days()
        .then(async (message) => {
            const response = await getSumOfPrice(message);
            res.json(response);
        })
        .catch(e => next(e));
}

function getRevenueOfLast7Days(req, res, next) {
    repository
        .getRevenueOfLast7Days()
        .then(async (message) => {
            const response = await getSumOfPrice(message);
            res.json(response);
        })
        .catch(e => next(e));
}

function getRevenueOfLastDay(req, res, next) {
    repository
        .getRevenueOfLastDay()
        .then(async (message) => {
            const response = await getSumOfPrice(message);
            res.json(response);
        })
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

function getRevenueData(req, res, next) {
    repository
        .getReveueData()
        .then(async (message) => {
            const response = await serializeJson(message);
            res.json(response);
        })
        .catch(e => next(e));
}

export default {
    getTotalRevenue,
    getRevenueData,
    getRevenueOfLastDay,
    getRevenueOfLast7Days,
    getRevenueOfLast30Days,
};
