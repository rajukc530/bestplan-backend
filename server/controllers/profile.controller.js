import repository from '../repositories/userRegistration.repository';

async function findUserProfile(req, res, next) {
    const { user } = req.auth;

    return repository
        .findUserProfile(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

export default {
    findUserProfile,
};
