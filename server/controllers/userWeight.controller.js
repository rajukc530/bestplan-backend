import repository from '../repositories/userWeight.repository';

const uuid = require('uuid');

async function createUserWeight(req, res, next) {
    const { user } = req.auth;
    const userWeight = req.body.weight;
    const weight = {
        id: uuid.v4(),
        userId: user,
        weight: userWeight,
    };
    repository
        .create(weight)
        .then(response => res.json(response))
        .catch(e => next(e));
}

async function getUserWeight(req, res, next) {
    const { user } = req.auth;
    repository
        .getUserWeight(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

async function getUserRecentWeight(req, res, next) {
    const { user } = req.auth;
    repository
        .getUserRecentWeight(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

export default {
    createUserWeight,
    getUserWeight,
    getUserRecentWeight,
};
