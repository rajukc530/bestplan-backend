import express from 'express';
import validate from 'express-validation';
import planController from '../controllers/plan.controller';
import paramValidation from '../../config/param-validation';
import { checkAuthHeader } from '../helpers/auth.middleware';

const router = express.Router(); // eslint-disable-line new-cap

router
    .route('/')
    /**
     * Creates new plan
     * @param {type} body.message.type - message type is required
     * @returns {object} 200 - {ok: true}
     * @returns {Error}  default - Unexpected error
     */
    .post(validate(paramValidation.plan), planController.create)

    .get(checkAuthHeader, planController.findAllPlans);

router
    .route('/name/:planName')
    /** get plan by name */
    .get(planController.findPlanByName);

// TODO: enhance conversation with details when id is mentioned
export default router;
