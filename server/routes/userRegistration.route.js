import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import registrationCtrl from '../controllers/userRegistration.controller';
import stripeCtrl from '../controllers/stripe.controller';
import profileCtrl from '../controllers/profile.controller';
import authCtrl from '../controllers/auth.controller';
import dietCtrl from '../controllers/diet.controller';
import { checkAuthHeader, canViewAllUsers } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new questions
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(
        validate(paramValidation.registerUser),
        registrationCtrl.registerUser,
    );

router
    .route('/all')
    .get(checkAuthHeader, canViewAllUsers, registrationCtrl.findAllUsers);

router
    .route('/all/training')
    .get(checkAuthHeader, registrationCtrl.findAllUsersInTraining);

router
    .route('/all/diet')
    .get(checkAuthHeader, registrationCtrl.findAllUsersInDiet);

router
    .route('/fetchnewusers')
    .get(checkAuthHeader, registrationCtrl.fetchNewUsers);

router
    .route('/totaluser')
    .get(checkAuthHeader, registrationCtrl.getTotalUserCount);

router
    .route('/last30days')
    .get(checkAuthHeader, registrationCtrl.getUserCountOfLast30Days);

router
    .route('/last7days')
    .get(checkAuthHeader, registrationCtrl.getUserCountOfLast7Days);

router
    .route('/lastday')
    .get(checkAuthHeader, registrationCtrl.getUserCountOfLastDay);

router
    .route('/userregistrationdata')
    .get(checkAuthHeader, registrationCtrl.getUserRegistrationData);

router.route('/profile').get(checkAuthHeader, profileCtrl.findUserProfile);

router
    .route('/plan/details')
    /** get plan by name */
    .get(checkAuthHeader, registrationCtrl.findUserPlan);

router
    .route('/updatetrainingplan')
    /** get plan by name */
    .put(checkAuthHeader, registrationCtrl.updateTrainingPlan);

router
    .route('/updatedietplan')
    /** get plan by name */
    .put(checkAuthHeader, registrationCtrl.updateDietPlan);

router
    .route('/goalweight')
    /** get plan by name */
    .get(checkAuthHeader, registrationCtrl.getUserGoalWeightData);

router
    .route('/programs')
    /** get plan by name */
    .post(
        checkAuthHeader,
        validate(paramValidation.programs),
        registrationCtrl.findAllProgramsForUser,
    );

router
    .route('/dietprogram')
    .post(
        checkAuthHeader,
        validate(paramValidation.dietProgram),
        registrationCtrl.saveDietProgram,
    );

router
    .route('/trainingprogram')
    .post(
        checkAuthHeader,
        validate(paramValidation.trainingProgram),
        registrationCtrl.saveTrainingProgram,
    );

router
    .route('/bothprogram')
    .post(
        checkAuthHeader,
        validate(paramValidation.bothProgram),
        registrationCtrl.saveBothPlan,
    );

router
    .route('/stripeorder')
    .post(
        validate(paramValidation.stripeOrder),
        stripeCtrl.placeStripeOrder,
    );

router
    .route('/macros')
    .get(
        checkAuthHeader,
        dietCtrl.findDietForUser,
    );

router
    .route('/program')
    .get(
        checkAuthHeader,
        registrationCtrl.getUserPlan,
    );

router
    .route('/generatetoken')
    .post(
        checkAuthHeader,
        canViewAllUsers,
        authCtrl.generateToken,
    );

router
    .route('/changepassword')
    .post(
        checkAuthHeader,
        registrationCtrl.changePassword,
    );
// router
//     .route('/sendemail')
//     .get(registrationCtrl.sendEmail);

// TODO: enhance conversation with details when id is mentioned
export default router;
