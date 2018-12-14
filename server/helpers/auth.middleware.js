import jwt from 'jsonwebtoken';
import config from '../../config/config';
import dietRepository from '../repositories/diet.repository';
import trainingRepository from '../repositories/training.repository';
import userRolesRepository from '../repositories/userRoles.repository';

/*
* checks if the request has a valid access token
*/
async function checkAuthHeader(req, res, next) {
    const tokenPrefix = 'Bearer';
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.replace(tokenPrefix, '');
        await jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                let jwtError = {};
                switch (err.message) {
                case 'jwt expired':
                    jwtError = {
                        name: err.name,
                        message: err.message,
                        messageCode: 'JWT_EXPIRED',
                        responseCode: '401',
                    };
                    return res.status(401).send(JSON.stringify(jwtError));
                case 'invalid signature':
                    jwtError = {
                        name: err.name,
                        message: err.message,
                        messageCode: 'INVALID_SIGNATURE',
                        responseCode: '401',
                    };
                    return res.status(401).send(JSON.stringify(jwtError));
                default:
                    return res.status(401).send(JSON.stringify(err));
                }
            }
            if (decoded) {
                req.auth = { user: decoded.iss, token: decoded };
                return next();
            }
            const jwtError = {
                name: 'invalid payload',
                message: 'invalid payload',
                messageCode: 'INVALID_PAYLOAD',
                responseCode: '401',
            };
            return res.status(401).send(JSON.stringify(jwtError));
        });
    } else {
        return res.status(401).send('invalid header');
    }
    return null;
}

async function canViewDietFiles(req, res, next) {
    const { user } = req.auth;
    const { name } = req.query;
    const userRole = await userRolesRepository.findUserByUserId(user);
    const diet = await dietRepository.findUsersByDiet(name);
    const userList = [];
    for (let user of diet) {
        userList.push(user.userId);
    }
    if (userRole && (userRole.roleId === 1 || userList.includes(user))) {
        return next();
    }
    return res.status(401).send('cannot view files');
}

async function canViewTrainingFiles(req, res, next) {
    const { user } = req.auth;
    const { name } = req.query;
    const dirName = name.split(' ')[0];
    const userRole = await userRolesRepository.findUserByUserId(user);
    const training = await trainingRepository.findUsersByTraining(dirName);
    const userList = [];
    for (let user of training) {
        userList.push(user.userId);
    }
    if (userRole && (userRole.roleId === 1 || userList.includes(user))) {
        return next();
    }
    return res.status(401).send('cannot view files');
}

async function canViewAllUsers(req, res, next) {
    const { user } = req.auth;
    const userRole = await userRolesRepository.findUserByUserId(user);
    if (userRole && userRole.roleId === 1) {
        return next();
    }
    return res.status(401).send('cannot view users');
}

export default {
    checkAuthHeader,
    canViewDietFiles,
    canViewTrainingFiles,
    canViewAllUsers,
};
