import repository from '../repositories/userRegistration.repository';
import config from '../../config/config';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function doLogin(req, res) {
    const user = req.body;
    const username = user.username;
    const userFromDB = await repository.findUserByUsername(username);
    if (userFromDB) {
        if (bcrypt.compareSync(user.password, userFromDB.password)) {
            const secret = config.jwtSecret;
            const claims = {
                sub: userFromDB.username,
                iss: userFromDB.id,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            };
            const jwtToken = jwt.sign(claims, secret);
            const roleId = userFromDB.UserRoles.roleId;
            const planName = userFromDB.UserPlan.description;
            const userToken = {
                username: user.username,
                token: jwtToken,
                firstName: userFromDB.firstName,
                lastName: userFromDB.lastName,
                role: roleId,
                plan: planName,
            };
            return res.status(200).send(JSON.stringify(userToken));
        }
    }
    const errorMsg = {
        message: 'INVALID USERNAME OR PASSWORD',
        messageCode: 'INVALID_USERNAME_OR_PASSWORD',
        responseCode: '200',
    };
    return res.status(200).send(JSON.stringify(errorMsg));
}

async function generateToken(req, res) {
    const { userId } = req.body;
    const secret = config.jwtSecret;
    const claims = {
        sub: userId,
        iss: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1,
    };
    const jwtToken = await jwt.sign(claims, secret);
    const userToken = {
        token: jwtToken,
    };
    return res.status(200).send(JSON.stringify(userToken));
}

async function checkIfClientIsAdmin(req, res) {
    const user = req.body;
    const username = user.username;
    const userFromDB = await repository.checkIfClientIsAdmin(username);
    if (userFromDB) {
        return res.status(200).send(JSON.stringify(userFromDB));
    }
    const errorMsg = {
        message: 'INVALID USERNAME OR PASSWORD',
        messageCode: 'INVALID_USERNAME_OR_PASSWORD',
        responseCode: '200',
    };
    return res.status(200).send(JSON.stringify(errorMsg));
}

export default {
    doLogin,
    checkIfClientIsAdmin,
    generateToken,
};
