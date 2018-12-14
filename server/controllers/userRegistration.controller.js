import repository from '../repositories/userRegistration.repository';
import userRoleRepository from '../repositories/userRoles.repository';
import userWeightRepository from '../repositories/userWeight.repository';
import trainingRepository from '../repositories/training.repository';
import dietRepository from '../repositories/diet.repository';
import emailService from '../service/email.service';

const uuid = require('uuid');
const bcrypt = require('bcrypt');

function saveUserRole(uId, res, next) {
    const userRole = {
        id: uuid.v4(),
        userId: uId,
        roleId: 2,
    };

    userRoleRepository
        .create(userRole)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function insertUpdatedWeight(userWeightId, user, wt, next) {
    const userWeight = {
        id: userWeightId,
        userId: user,
        weight: wt,
    };
    userWeightRepository
        .create(userWeight)
        .catch(e => next(e));
}

function sendEmail(response, planName) {
    const msg = `Greetings ${
        response.firstName
    }, \n\nYou are successfully enrolled in Plan '${planName}'.We wish you best of luck for your goal. \n\nBest Regards, \nBestPlan`;

    const userObj = {
        toEmail: response.email,
        text: msg,
    };

    emailService.sendEmail(userObj);
}

function findAllUsers(req, res, next) {
    repository
        .findAllUsers()
        .then(response => res.json(response))
        .catch(e => next(e));
}

/**
 *
 * @param {*} user
 */
async function updateDietOrTrainingProgram(user, next) {
    if (user.trainingPerWeek === '') {
        const diet = {
            id: uuid.v4(),
            userId: user.id,
            name: user.dietPlan,
            protein: user.protein,
            fat: user.fat,
            carbs: user.carbs,
            calorie: user.calorie,
            hasPaid: 'Y',
        };
        dietRepository
            .create(diet)
            .catch(e => next(e));
    } else if (user.dietPlan === '') {
        const training = {
            id: uuid.v4(),
            userId: user.id,
            name: user.trainingPerWeek,
            hasPaid: 'Y',
        };
        trainingRepository
            .create(training)
            .catch(e => next(e));
    } else if (user.trainingPerWeek !== '' && user.dietPlan !== '') {
        const diet = {
            id: uuid.v4(),
            userId: user.id,
            name: user.dietPlan,
            protein: user.protein,
            fat: user.fat,
            carbs: user.carbs,
            calorie: user.calorie,
            hasPaid: 'Y',
        };

        const training = {
            id: uuid.v4(),
            userId: user.id,
            name: user.trainingPerWeek,
            hasPaid: 'Y',
        };

        await dietRepository
            .create(diet)
            .catch(e => next(e));
        await trainingRepository
            .create(training)
            .catch(e => next(e));
    }
}

/**
 * Create new user
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * * @property {string} req.body.email - The email of user.
 * @returns {Registered User}
 */
function registerUser(req, res, next) {
    const user = req.body;
    const userId = uuid.v4();
    const userWeightId = uuid.v4();
    user.id = userId;
    user.isActive = 'Y';
    user.hasPaid = 'Y';
    const planName = user.planName;
    delete user.planName;
    const saltRounds = 10;
    const password = user.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    repository
        .create(user)
        .then((savedUser) => {
            const response = savedUser;
            response.password = '';
            saveUserRole(savedUser.id, res, next);
            insertUpdatedWeight(userWeightId, userId, user.weight, next);
            updateDietOrTrainingProgram(user, next);
            sendEmail(response, planName);
            res.json(response);
        })
        .catch(e => next(e));
}

function fetchNewUsers(req, res, next) {
    repository
        .fetchNewUsers()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getTotalUserCount(req, res, next) {
    repository
        .getTotalUserCount()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getUserCountOfLast30Days(req, res, next) {
    repository
        .getUserCountOfLast30Days()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getUserCountOfLast7Days(req, res, next) {
    repository
        .getUserCountOfLast7Days()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function getUserCountOfLastDay(req, res, next) {
    repository
        .getUserCountOfLastDay()
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

function serializeUserGoalWeightJson(message) {
    const resMsg = JSON.parse(JSON.stringify(message));
    const months = [];
    const weight = [];
    let res = {};
    for (const msg of resMsg) {
        months.push(msg.month);
        weight.push(msg.weight);
    }

    res = {
        month: months,
        data: weight,
    };
    return res;
}

function getUserRegistrationData(req, res, next) {
    repository
        .getUserRegistrationData()
        .then(async (message) => {
            const response = await serializeJson(message);
            res.json(response);
        })
        .catch(e => next(e));
}

function getUserGoalWeightData(req, res, next) {
    const { user } = req.auth;
    repository
        .getUserGoalWeightChart(user)
        .then(async (message) => {
            const response = await serializeUserGoalWeightJson(message);
            res.json(response);
        })
        .catch(e => next(e));
}

function findUserPlan(req, res, next) {
    const { user } = req.auth;
    repository
        .getPlanDetails(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function updateUserPlan(req, res, next) {
    const { user } = req.auth;
    repository
        .updateUserPlan(user)
        .then(response => res.json(response))
        .catch(e => next(e));
}

async function findAllProgramsForUser(req, res, next) {
    // const planName = req.body.planName;
    const { user } = req.auth;
    // const planForUser = await repository
    //     .getPlanDetails(user);
    // const planName = planForUser.UserPlan.name;
    // // console.log('planName ', planName);
    // if (planName === 'Diet') {
    //     dietRepository
    //         .findAllDietsForUser(user)
    //         .then((message) => {
    //             const response = {
    //                 Diet: message,
    //             };
    //             res.json(response);
    //         })
    //         .catch(e => next(e));
    // } else if (planName === 'Training') {
    //     trainingRepository
    //         .findAllTrainingsForUser(user)
    //         .then((message) => {
    //             const response = {
    //                 Training: message,
    //             };
    //             res.json(response);
    //         })
    //         .catch(e => next(e));
    // } else if (planName === 'Training & Diet') {
    //     const diet =
    //         await dietRepository.findAllDietsForUser(user);
    //     const training =
    //         await trainingRepository.findAllTrainingsForUser(user);
    //     const response = {
    //         Diet: diet,
    //         Training: training,
    //     };
    //     return res.send(JSON.stringify(response));
    // }
    // return [];
    const diet =
        await dietRepository.findAllDietsForUser(user);
    const training =
        await trainingRepository.findAllTrainingsForUser(user);
    const response = {
        Diet: diet,
        Training: training,
    };
    return res.send(JSON.stringify(response));
}

async function saveDietProgram(req, res, next) {
    const dietProgram = req.body;
    const { user } = req.auth;
    const dietPlan = await dietRepository.findDietForUser(user)
        .catch(e => next(e));

    dietProgram.id = uuid.v4();
    dietProgram.userId = user;
    dietProgram.hasPaid = 'Y';
    dietProgram.fat = dietPlan.fat;
    dietProgram.protein = dietPlan.protein;
    dietProgram.carbs = dietPlan.carbs;
    dietProgram.calorie = dietPlan.calorie;
    dietRepository
        .create(dietProgram)
        .then(response => res.json(response))
        .catch(e => next(e));
}

function saveTrainingProgram(req, res, next) {
    const trainingPerWeek = req.body;
    const { user } = req.auth;
    trainingPerWeek.id = uuid.v4();
    trainingPerWeek.userId = user;
    trainingPerWeek.hasPaid = 'Y';
    trainingRepository
        .create(trainingPerWeek)
        .then(response => res.json(response))
        .catch(e => next(e));
}

async function updateTrainingPlan(req, res, next) {
    // await saveTrainingProgram(req, res, next);
    const trainingPerWeek = req.body;
    const { user } = req.auth;
    trainingPerWeek.id = uuid.v4();
    trainingPerWeek.userId = user;
    trainingPerWeek.hasPaid = 'Y';
    await trainingRepository
        .create(trainingPerWeek)
        .catch(e => next(e));
    await updateUserPlan(req, res, next);
}

async function updateDietPlan(req, res, next) {
    // await saveDietProgram(req, res, next);
    const dietProgram = req.body;
    const { user } = req.auth;
    dietProgram.id = uuid.v4();
    dietProgram.userId = user;
    dietProgram.hasPaid = 'Y';
    await dietRepository
        .create(dietProgram)
        // .then(response => res.json(response))
        .catch(e => next(e));
    await updateUserPlan(req, res, next);
}

async function saveBothPlan(req, res, next) {
    const { user } = req.auth;
    const dietPlan = req.body.dietPlan;
    const trainingPerWeek = req.body.trainingPerWeek;

    const tempPlan = await dietRepository.findDietForUser(user)
        .catch(e => next(e));
    const reqFat = tempPlan.fat;
    const reqCarbs = tempPlan.carbs;
    const reqProtein = tempPlan.protein;
    const reqCalorie = tempPlan.calorie;

    const dietProgram = {
        id: uuid.v4(),
        userId: user,
        hasPaid: 'Y',
        name: dietPlan,
        fat: reqFat,
        carbs: reqCarbs,
        protein: reqProtein,
        calorie: reqCalorie,
    };

    const trainingProgram = {
        id: uuid.v4(),
        userId: user,
        hasPaid: 'Y',
        name: trainingPerWeek,
    };

    await dietRepository
        .create(dietProgram)
        .catch(e => next(e));

    await trainingRepository
        .create(trainingProgram)
        .catch(e => next(e));

    await updateUserPlan(req, res, next);
}

function findAllUsersInTraining(req, res, next) {
    repository
        .findAllUsersInTraining()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function findAllUsersInDiet(req, res, next) {
    repository
        .findAllUsersInDiet()
        .then(response => res.json(response))
        .catch(e => next(e));
}

function serializeUserPlan(message) {
    return message.UserPlan.name;
}

function getUserPlan(req, res, next) {
    const { user } = req.auth;
    repository
        .findUserPlan(user)
        .then(async (message) => {
            const response = await serializeUserPlan(message);
            res.json(response);
        })
        .catch(e => next(e));
}

async function changePassword(req, res, next) {
    const changePasswordModel = req.body;
    const { user } = req.auth;
    let errorMsg = {};
    const userFromDB = await repository.findById(user);
    if (userFromDB) {
        if (bcrypt.compareSync(changePasswordModel.password, userFromDB.password)) {
            const password = changePasswordModel.newPassword;
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            return repository.updateUser(user, hash)
                .then((savedUser) => {
                    const response = savedUser;
                    response.password = '';
                    res.json(response);
                })
                .catch(e => next(e));
        }
        errorMsg = {
            error: 'Password is incorrect',
        };
        return res.status(200).send(JSON.stringify(errorMsg));
    }
    errorMsg = {
        error: 'Invalid user',
    };
    return res.status(200).send(JSON.stringify(errorMsg));
}

export default {
    registerUser,
    findAllUsersInTraining,
    findAllUsersInDiet,
    saveUserRole,
    fetchNewUsers,
    getTotalUserCount,
    getUserCountOfLast30Days,
    getUserCountOfLast7Days,
    getUserCountOfLastDay,
    getUserRegistrationData,
    sendEmail,
    findUserPlan,
    getUserGoalWeightData,
    findAllProgramsForUser,
    saveDietProgram,
    saveTrainingProgram,
    updateTrainingPlan,
    updateDietPlan,
    saveBothPlan,
    getUserPlan,
    findAllUsers,
    changePassword,
};
